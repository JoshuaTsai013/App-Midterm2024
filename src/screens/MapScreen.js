import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Animated, Dimensions, Platform, _ScrollView } from 'react-native';
import { HStack, Center, Box, Text, Pressable, VStack } from "@gluestack-ui/themed";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from '../json/MapViewStyle.json'
import { UserLocation } from '../components/UserLocation'
import { Marker } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from "../Api";
import { data, region } from "../components/Data"
import FontAwesome from 'react-native-vector-icons/FontAwesome6'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const MapScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { location, setLocation } = useContext(UserLocation);
    const [selectedLocation, setSelectedLocation] = useState(null); // 新增 selectedLocation 狀態來存儲選擇的位置
    const [selectedPlaceName, setSelectedPlaceName] = useState('');
    const [zoomRatio, setZoomRatio] = useState(1);
    const [showScrollView, setShowScrollView] = useState(true);

    const [data2Array, setData2Array] = useState([]);

    const mapRef = useRef(null);
    const _scrollView = useRef(null);
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        // 在渲染完成後收集所有的 innerItem 到 data2Array
        const newData2Array = [];
        data.forEach((testItem) => {
            if (testItem.data2) {
                newData2Array.push(...Object.values(testItem.data2));
            }
        });
        setData2Array(newData2Array);
    }, []);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= data2Array.length) {
                index = data2Array.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = data2Array[index];
                    mapRef.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        },
                        1000
                    );
                }
            }, 10);
        });
    });

    async function moveToLocation(latitude, longitude) {
        mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
            1000,
        );
        setSelectedLocation({ latitude, longitude });
        setShowScrollView(false);
    }
    const onRegionChangeComplete = (rgn) => {
        if (rgn.longitudeDelta > 0.02)
            setZoomRatio(0.02 / rgn.longitudeDelta);
        else
            setZoomRatio(1);
    }
    const interpolations = data2Array.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
        ];
        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });
        return { scale };

    });
    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;
        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }
        _scrollView.current.scrollTo({ x: x + 20, y: 0, animated: true });
    }

    return location?.latitude && (
        <Box alignItems='center' flex={1}>
            <Box mt={60} w="80%" position='absolute' zIndex={10}>
                <GooglePlacesAutocomplete
                    placeholder='Search your memory'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        setSelectedPlaceName(details.name);
                        console.log(JSON.stringify(details?.geometry?.location));
                        moveToLocation(details.geometry.location.lat, details.geometry.location.lng);
                    }}
                    query={{
                        key: GOOGLE_MAP_API_KEY,
                        language: 'en',
                    }}
                    styles={{
                        container: {
                            borderRadius: 20
                        },
                        textInputContainer: {
                            borderRadius: 20, // 設置文字輸入框容器的邊緣半徑為20像素，使邊緣變圓
                        },
                        textInput: {
                            borderRadius: 20, // 設置文字輸入框的邊緣半徑為20像素，使邊緣變圓
                        },
                    }}
                />
            </Box>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapViewStyle}
                initialRegion={region}
                showsUserLocation={true}
                onRegionChangeComplete={onRegionChangeComplete}
                region={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: region.latitudeDelta,
                    longitudeDelta: region.longitudeDelta
                }}>
                {(zoomRatio > 0.14) && data2Array.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                                // scale: 1,
                            },
                        ],
                    };
                    return (
                        <Marker
                            coordinate={marker.coordinate}
                            key={index}
                            onPress={(e) => onMarkerPress(e)}
                        >
                            <Animated.View style={styles.markerWrap}>
                                <Animated.Image
                                    source={require('../../image/locationIcon.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover" />
                            </Animated.View>
                        </Marker>
                    );
                })}
                {selectedLocation && (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude
                        }}
                        title={selectedPlaceName}
                        onPress={() => setShowScrollView(true)}
                    >
                        <Animated.View style={styles.markerWrap}>
                            <Animated.Image
                                source={require('../../image/locationIcon.png')}
                                style={[styles.marker, { transform: [{ scale: 1.5 }] }]}
                                resizeMode="center" />
                        </Animated.View>
                    </Marker>
                )}
            </MapView>
            {showScrollView && (<Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {data.map((testItem, testIndex) => (
                    <React.Fragment key={testIndex}>
                        {testItem.data2 && testItem.data2.map((innerItem, innerIndex) => (
                            <HStack
                                alignItems='center'
                                bgColor={colors.white}
                                borderColor={colors.lightGray}
                                style={styles.card}
                                key={`${testIndex}_${innerIndex}`}>
                                <VStack gap={5} style={styles.textContent}>
                                    <Text
                                        color={colors.black}
                                        numberOfLines={1}
                                        style={styles.cardtitle}
                                    >{testItem.title}</Text>
                                    <Text
                                        ml={2}
                                        color={colors.darkGray}
                                        numberOfLines={1}
                                        style={styles.cardDate}
                                    >{innerItem.date}</Text>
                                    <HStack
                                        gap={5}
                                        mt={20}
                                        ml={2}
                                    >
                                        <FontAwesome
                                            name='location-dot'
                                            size={16}
                                            color={colors.darkGreen}
                                        />
                                        <Text
                                            color={colors.darkGreen}
                                            numberOfLines={1}
                                            style={styles.cardLocation}
                                        >{innerItem.location}</Text>
                                    </HStack>
                                </VStack>
                                <Pressable
                                    style={styles.cardImage}
                                    onPress={() => {
                                        navigation.navigate('DetailScreen', { item: testItem });
                                    }}
                                >
                                    <Image
                                        source={innerItem.image}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </Pressable>
                            </HStack>
                        ))}
                    </React.Fragment>
                ))}
            </Animated.ScrollView>)}
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    scrollView: {
        position: "absolute",
        bottom: 90,
        left: 0,
        right: 0,
        paddingVertical: 10,

    },
    card: {
        elevation: 2,
        borderRadius: 20,
        borderWidth: 0.2,
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 2.4,
        marginRight: 5,
    },
    image: {
        width: "100%",
        height: "90%",
        alignSelf: "center",
        marginRight: 10,
        borderRadius: 20,
    },
    textContent: {
        flex: 2,
        paddingLeft: 30,
    },
    cardtitle: {
        fontSize: 22,
        fontWeight: "bold",
    },
    cardDate: {
        fontSize: 14,
    },
    cardLocation: {
        fontSize: 14,
        fontWeight: "bold",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
});

export default MapScreen;
