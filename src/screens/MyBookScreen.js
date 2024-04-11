import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Animated, Dimensions, Platform, _ScrollView } from 'react-native';
import { HStack, Center, Box, Text, Pressable, VStack } from "@gluestack-ui/themed";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from '../json/MapViewStyle.json'
import { UserLocation } from '../components/UserLocation'
import { Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from "../Api";
import MemoryPlace from "../json/MemoryPlace.json"
import { markers } from "../components/test"
import FontAwesome from 'react-native-vector-icons/FontAwesome6'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const WishListScreen = () => {

    const { location, setLocation } = useContext(UserLocation);
    const [selectedLocation, setSelectedLocation] = useState(null); // 新增 selectedLocation 狀態來存儲選擇的位置
    const [zoomRatio, setZoomRatio] = useState(1);
    const [showScrollView, setShowScrollView] = useState(true); // 控制 ScrollView 的显示状态
    const region = {
        latitude: 25.067247,
        longitude: 121.611504,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
    }

    const mapRef = useRef(null);
    const _scrollView = useRef(null);
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= markers.length) {
                index = markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = markers[index];
                    mapRef.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        },
                        350
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
            2000,
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
    const interpolations = markers.map((marker, index) => {
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
    const onMarkerPress = (mapEventData,index) => {
        const markerID = mapEventData._targetInst.return.key;
        const scaleStyle = {
            transform: [
                {
                    scale: interpolations[index].scale,
                    // scale: 1,
                },
            ],
        };
        let x = (markerID * CARD_WIDTH) + (markerID * 20); 
        if (Platform.OS === 'ios') {
          x = x - SPACING_FOR_CARD_INSET;
        }
        _scrollView.current.scrollTo({x: x+20, y: 0, animated: true});
        console.log(markerID);
      }

    return location?.latitude && (
        <Box alignItems='center' flex={1}>
            <Box mt={60} w="80%" position='absolute' zIndex={10}>
                <GooglePlacesAutocomplete
                    placeholder='Search your memory'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        console.log(JSON.stringify(details?.geometry?.location));
                        moveToLocation(details?.geometry?.location.lat, details?.geometry?.location.lng);
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
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    latitudeDelta: region.latitudeDelta,
                    longitudeDelta: region.longitudeDelta
                }}>
                {(zoomRatio > 0.14) && markers.map((marker, index) => {
                    console.log(index);
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
                            onPress={(e)=>onMarkerPress(e)}
                        >
                            <Animated.View style={styles.markerWrap}>
                                <Animated.Image
                                    source={require('../../image/locationIcon1.png')}
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
                        title={'Selected Location'}
                        description={'Description of selected location'}
                        onPress={()=>setShowScrollView(true)}
                    >
                        <Animated.View style={styles.markerWrap}>
                            <Animated.Image
                                source={require('../../image/locationIcon1.png')}
                                style={styles.marker}
                                resizeMode="center" />
                            {/* <FontAwesome name='location-dot' size={30} color='#466A47' /> */}
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
                {markers.map((marker, index) => (
                    <HStack alignItems='center' style={styles.card} key={index}>
                        <VStack gap={5} style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            <Text ml={2} numberOfLines={1} style={styles.cardDate}>{marker.date}</Text>
                            <HStack gap={5} mt={20} ml={2}>
                                <FontAwesome name='location-dot' size={16} color='#466A47' />
                                <Text numberOfLines={1} style={styles.cardLocation}>{marker.location}</Text>
                            </HStack>
                        </VStack>
                        <Image
                            source={marker.image}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                    </HStack>
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
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: "gray",
        borderWidth: 0.2,
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 2.4,
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
        color: "#131313"
    },
    cardDate: {
        fontSize: 12,
        color: "#131313"
    },
    cardLocation: {
        fontSize: 14,
        color: "#466A47",
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

export default WishListScreen;
