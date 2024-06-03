import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Animated, Dimensions, Platform, _ScrollView } from 'react-native';
import { HStack, Center, Box, Text, Pressable, VStack } from "@gluestack-ui/themed";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from '../json/MapViewStyle.json'
import MapViewStyleTwo from '../json/MapViewStyleTwo.json'
import { UserLocation } from '../components/UserLocation'
import { Marker } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GOOGLE_MAP_API_KEY } from "../Api";
import { region } from "../components/Data"
import testdata from '../json/Data.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome6'
import { useSelector } from "react-redux";
import { selectColorMode } from "../Redux/cartReducer";
import images from '../../assets/image';


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
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(testdata);
    const [highlightedIndex, setHighlightedIndex] = useState(null); // 新增
    const [favoritesSelected, setFavoritesSelected] = useState(false);

    const cart = useSelector((state) => state.cart.cart);
    const colorMode = useSelector(selectColorMode);

    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            let filters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(filters);

        } else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    const handleFavoritesClick = () => {
        setFavoritesSelected(!favoritesSelected);
    };

    useEffect(() => {
        filterItems();
    }, [selectedFilters, favoritesSelected]);

    const filterItems = () => {
        let tempItems = [...testdata];

        if (favoritesSelected) {
            tempItems = tempItems.filter(item => cart.some(cartItem => cartItem.id === item.id));
        }

        if (selectedFilters.length > 0) {
            tempItems = tempItems.filter(item => selectedFilters.includes(item.category));
        }

        setFilteredItems(tempItems);
    };
    const mapRef = useRef(null);
    const _scrollView = useRef(null);
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {

        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.2);
            if (index >= testdata.length) {
                index = testdata.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            const correspondingIndex = testdata.findIndex((item) => item.id === filteredItems[index].id);
            setHighlightedIndex(index);
            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== correspondingIndex) {
                    mapIndex = correspondingIndex;
                    const { coordinate } = testdata[correspondingIndex];
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
    const onRegionChangeComplete = (rgn) => {
        if (rgn.longitudeDelta > 0.02)
            setZoomRatio(0.02 / rgn.longitudeDelta);
        else
            setZoomRatio(1);
    }
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
            {favoritesSelected ?
                <Pressable
                    backgroundColor={colors.darkGreen}
                    style={styles.likeButton}
                    onPress={handleFavoritesClick}>
                    <MaterialIcons name='bookmark' color={colors.white} size={27} />
                </Pressable> :
                <Pressable
                    backgroundColor={colors.white}
                    style={styles.likeButton}
                    onPress={handleFavoritesClick}>
                    <MaterialIcons name='bookmark-outline' color={colors.darkGray} size={27} />
                </Pressable>}
            {colorMode == "light" ?
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
                    {(zoomRatio > 0.14) && filteredItems.map((marker, index) => {
                        const isFavorite = cart.some(cartItem => cartItem.id === marker.id);
                        return (
                            <Marker
                                coordinate={marker.coordinate}
                                key={index}
                                onPress={(e) => onMarkerPress(e)}
                            >{
                                    highlightedIndex === index ?
                                        <Box style={{ zIndex: 999 }}>
                                            <Image
                                                source={require('../../image/speech-bubble.png')}
                                                style={[{ width: 200 }, styles.highlightedMarker]} // 修改樣式
                                            />
                                            <HStack w={200} h={40} position='absolute' top={34} left={23} zIndex={999} alignItems='center'>
                                                <Image
                                                    source={images[marker.image]}
                                                    style={styles.markerImage}
                                                    resizeMode='cover' />
                                                <Text w={60} ml={10} fontSize={14} numberOfLines={1} overflow='hidden' >{marker.title}</Text>
                                                <Box position='absolute' right={40}>
                                                    {isFavorite ?
                                                        <MaterialIcons name='bookmark' color={colors.darkGreen} size={20} /> :
                                                        <MaterialIcons name='bookmark-outline' color={colors.darkGray} size={20} />
                                                    }
                                                </Box>
                                            </HStack>
                                        </Box> :
                                        <Box>
                                            <Image
                                                source={require('../../image/speech-bubble.png')}
                                                style={styles.marker} // 修改樣式
                                                resizeMode="contain" />
                                            <HStack w={120} h={30} gap={10} position='absolute' top={78} left={18} alignItems='center'>
                                                <Image
                                                    source={images[marker.image]}
                                                    style={styles.markerImage}
                                                    resizeMode='cover' />
                                                <Text w={50} fontSize={12} numberOfLines={1} overflow='hidden' >{marker.title}</Text>
                                            </HStack>
                                        </Box>
                                }</Marker>
                        );
                    })}
                </MapView>
                : <MapView
                    ref={mapRef}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={MapViewStyleTwo}
                    initialRegion={region}
                    showsUserLocation={true}
                    onRegionChangeComplete={onRegionChangeComplete}
                    region={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: region.latitudeDelta,
                        longitudeDelta: region.longitudeDelta
                    }}>
                    {(zoomRatio > 0.14) && filteredItems.map((marker, index) => {
                        const isFavorite = cart.some(cartItem => cartItem.id === marker.id);
                        return (
                            <Marker
                                coordinate={marker.coordinate}
                                key={index}
                                onPress={(e) => onMarkerPress(e)}
                            >{
                                    highlightedIndex === index ?
                                        <Box style={{ zIndex: 999 }}>
                                            <Image
                                                source={require('../../image/speech-bubble.png')}
                                                style={[{ width: 200 }, styles.highlightedMarker]} // 修改樣式
                                            />
                                            <HStack w={200} h={40} position='absolute' top={34} left={23} zIndex={999} alignItems='center'>
                                                <Image
                                                    source={images[marker.image]}
                                                    style={styles.markerImage}
                                                    resizeMode='cover' />
                                                <Text w={60} ml={10} fontSize={14} numberOfLines={1} overflow='hidden' >{marker.title}</Text>
                                                <Box position='absolute' right={40}>
                                                    {isFavorite ?
                                                        <MaterialIcons name='bookmark' color={colors.darkGreen} size={20} /> :
                                                        <MaterialIcons name='bookmark-outline' color={colors.darkGray} size={20} />
                                                    }
                                                </Box>
                                            </HStack>
                                        </Box> :
                                        <Box>
                                            <Image
                                                source={require('../../image/speech-bubble.png')}
                                                style={styles.marker} // 修改樣式
                                                resizeMode="contain" />
                                            <HStack w={120} h={30} gap={10} position='absolute' top={78} left={18} alignItems='center'>
                                                <Image
                                                    source={images[marker.image]}
                                                    style={styles.markerImage}
                                                    resizeMode='cover' />
                                                <Text w={50} fontSize={12} numberOfLines={1} overflow='hidden' >{marker.title}</Text>
                                            </HStack>
                                        </Box>
                                }</Marker>
                        );
                    })}
                </MapView>}

            <Animated.ScrollView
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
                    marginleft: 0
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
                {filteredItems.map((testItem, testIndex) => (
                    <HStack
                        alignItems='center'
                        bgColor={colors.white}
                        borderColor={colors.lightGray}
                        style={styles.card}
                        key={`items-${testIndex}`}>
                        <VStack gap={10} style={styles.textContent}>
                            <Text
                                color={colors.black}
                                numberOfLines={1}
                                style={styles.cardtitle}
                            >{testItem.title}</Text>
                            <HStack
                                gap={5}
                                ml={2}
                            >
                                <FontAwesome
                                    name='calendar'
                                    size={16}
                                    color={colors.darkGray}
                                />
                                <Text
                                    ml={2}
                                    color={colors.darkGray}
                                    numberOfLines={1}
                                    style={styles.cardDate}
                                >{testItem.date}</Text>
                            </HStack>
                            <HStack
                                gap={5}
                                mt={10}
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
                                >{testItem.location}</Text>
                            </HStack>
                        </VStack>
                        <Pressable
                            style={styles.cardImage}
                            onPress={() => {
                                navigation.navigate('DetailScreen', { item: testItem });
                            }}
                        >
                            <Image
                                source={images[testItem.image]}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </Pressable>
                    </HStack>
                ))}
            </Animated.ScrollView>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}>
                {Array.from(new Set(testdata.map(testItem => testItem.category))).map((category, index) => (
                    <Pressable
                        onPress={() => handleFilterButtonClick(category)}
                        style={styles.chipsItem}
                        bgColor={
                            selectedFilters.includes(category)
                                ? colors.darkGreen
                                : colors.white
                        }
                        key={`filters-${index}`}
                    >
                        <Text fontSize={12} color={
                            selectedFilters.includes(category)
                                ? colors.white
                                : colors.black
                        }>{category}</Text>
                    </Pressable>
                ))}
                <Box w={30} />
            </ScrollView>
        </Box >
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
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    card: {
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
    markerImage: {
        width: '30%',
        height: '100%',
    },
    marker: {
        height: 200,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    highlightedMarker: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    chipsScrollView: {
        position: 'absolute',
        top: 20,
        paddingHorizontal: 30,
    },
    chipsItem: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 30,
        marginRight: 10,
        paddingHorizontal: 20,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    likeButton: {
        position: 'absolute',
        width: 45,
        height: 45,
        top: 70,
        right: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }

});

export default MapScreen;
