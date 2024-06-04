import React, { useState, useRef, useEffect } from "react";
import { HStack, Box, Text, Pressable, VStack, Center, Menu, MenuItem, Icon, MenuIcon, MenuItemLabel, Button, ButtonText } from "@gluestack-ui/themed";
import { Modal, SafeAreaView, StyleSheet, Image, ScrollView, useColorScheme, Dimensions, _ScrollView, Animated, TouchableOpacity, Easing, RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
// import { data, testdata, region } from "../components/Data"
import FontAwesome from 'react-native-vector-icons/FontAwesome6'
import { useSelector } from "react-redux";
import { selectColorMode } from "../Redux/cartReducer";
import testdata from '../json/Data.json'
import images from '../../assets/image';
import { useFocusEffect } from '@react-navigation/native';
//import testdata from '../json/Data.json'
//import images from '../../assets/image';
import * as FileSystem from 'expo-file-system';

import { getStoredTripData } from '../components/Fs'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const colorMode = useSelector(selectColorMode);
    const [visible, setVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(testdata);
    const [favoritesSelected, setFavoritesSelected] = useState(false);
    const [testdata, setData] = useState([]);
    console.log("testdata________entry", testdata)
    const [isLoading, setIsLoading] = useState(true);
    //const [refreshing, setRefreshing] = useState(false);

    const scale = useRef(new Animated.Value(0)).current;
    const cart = useSelector((state) => state.cart.cart);
    const fetchData = async () => {
        try {
          const data = await getStoredTripData();
          setData(data);
        } catch (error) {
          console.error("Error fetching trip data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
    useEffect(() => {
        fetchData();
        //setRefreshing(true)
        //FileSystem.deleteAsync("file:///var/mobile/Containers/Data/Application/BF6A6909-E7D6-43BF-B1A8-6B889C449760/Documents/ExponentExperienceData/@anonymous/wander-9a435468-88e0-4184-9994-838bf35b42ee/tripData.json", { idempotent: true });


      }, []); // Dependency on tripData to trigger re-render

    // const handleRefresh = () => {
    //     setRefreshing(true);
    //     console.log(refreshing)
    //   }


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

    function resizeBox(to) {
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }

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
    if (isLoading) {
        console.log("Loading screen")
        return (
           <></>
        );
    }

    return (
        <Box>
            <>
                <Box w={40}
                    h={40}
                    borderRadius={100}
                    bgColor={colors.lightGray}
                    position='absolute'
                    right={25}
                    top={25}
                    alignItems="center"
                    justifyContent="center"
                    zIndex={999}>
                    <TouchableOpacity onPress={() => resizeBox(1)}>
                        <MaterialIcons name='menu' size={20} />
                    </TouchableOpacity>
                </Box>
                <Modal transparent visible={visible}>
                    <SafeAreaView
                        style={{ flex: 1 }}
                        onTouchStart={() => resizeBox(0)}
                    >
                        <Animated.View style={[styles.popup, { transform: [{ scale }], }]}>
                            <TouchableOpacity
                                style={{ width: '100%', borderBottomWidth: 1, borderColor: colors.lightGray, borderRadius: 10 }}
                                onPress={handleFavoritesClick}
                            >
                                <Box
                                    bgColor={favoritesSelected ? colors.darkGreen : colors.white}
                                    borderStartStartRadius={10}
                                    borderStartEndRadius={10}
                                >
                                    <Text
                                        h={40}
                                        pt={12}
                                        pl={15}
                                        fontSize={14}
                                        fontWeight="bold"
                                        color={favoritesSelected ? colors.white : colors.darkGray}>我的珍藏</Text>
                                    <Text
                                        position="absolute"
                                        right={17}
                                        top={10}
                                        color={favoritesSelected ? colors.white : colors.darkGray}>{cart.length}</Text>
                                </Box>
                            </TouchableOpacity>
                            {Array.from(new Set(testdata.map(testItem => testItem.category))).map((category, index) => (
                                <TouchableOpacity
                                    style={{ width: '100%', borderBottomWidth: 1, borderColor: colors.lightGray, borderRadius: 10 }}
                                    key={`filters-${index}`}
                                    onPress={() => handleFilterButtonClick(category)}
                                >
                                    {
                                        selectedFilters.includes(category)
                                            ? <HStack>
                                                <Text h={40} pt={12} pl={15} fontSize={14}>{category}</Text>
                                                <Box position="absolute" right={15} top={10}>
                                                    <FontAwesome name="check" size={20} />
                                                </Box>
                                            </HStack>
                                            : <HStack>
                                                <Text h={40} pt={12} pl={15} fontSize={14}>{category}</Text>
                                            </HStack>
                                    }
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </SafeAreaView>
                </Modal>
            </>
            <Box bg={colorMode == "light" ? colors.white : colors.lightBlack} height="100%" alignItems="center">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingTop: 10 }}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                >
                    <Box h={40} m={15} pl={10} pt={5}>
                        <Text w={300} fontSize={27} color={colorMode == "light" ? colors.black : colors.white} numberOfLines={1} fontWeight="bold">
                            {favoritesSelected
                                ? '我的珍藏'
                                : (selectedFilters.length === 0
                                    ? '全部'
                                    : `${selectedFilters.join(', ')}`)}
                        </Text>
                    </Box>

                    {filteredItems.map((testItem, testIndex) => (
                        <HStack
                            alignItems='center'
                            bgColor={colors.white}
                            borderColor={colors.lightGray}
                            style={styles.card}
                            key={`${testIndex}`}>
                            <Pressable
                                style={styles.cardImage}
                                onPress={() => {
                                    navigation.navigate('DetailScreen', { item: testItem });
                                }}
                            >
                                <Image
                                    source={{ url: testItem.image }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            </Pressable>
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
                        </HStack>
                    ))}
                    <Box h={100}></Box>
                </ScrollView>
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lugrasimo-Regular',
        fontSize: 50,
        fontWeight: "bold",
    },
    card: {
        marginBottom: 40,
        borderRadius: 20,
        borderWidth: 0.2,
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    cardImage: {
        flex: 2.4,
        marginLeft: 15,
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
    popup: {
        width: 230,
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'absolute',
        top: 220,
        right: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export default HomeScreen;