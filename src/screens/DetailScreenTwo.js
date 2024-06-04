import { View, FlatList, StyleSheet, Image, ScrollView, TextInput, Dimensions, Platform, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import RenderItem from '../components/RenderItem';
import { HStack, Box, Text, Pressable, VStack, Center, Menu, MenuItem, Icon, MenuIcon, MenuItemLabel, Button, ButtonText, Input, InputField } from "@gluestack-ui/themed";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { testdata } from '../components/Data';
import DetailPopupMenu from "../components/DetailPopupMenu";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite } from "../Redux/cartReducer";
import { selectColorMode } from "../Redux/cartReducer";
import images from '../../assets/image'; 

const { width, height } = Dimensions.get('screen')

const DetailScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const { item } = route.params;
    const [title, setTitle] = useState(item.title);
    const [location, setLocation] = useState(item.location);
    const [toggle, setToggle] = useState(true);
    const cart = useSelector((state) => state.cart.cart);
    const colorMode = useSelector(selectColorMode);
    const dispatch = useDispatch();

    const titleChange = (value) => {
        setTitle(value);
    };
    const locationChange = (value) => {
        setLocation(value);
    };
    const addItemToFavorite = (item) => {
        dispatch(addToFavorite(item));
    };
    const removeItemFromFavorite = (item) => {
        dispatch(removeFromFavorite(item));
    };
    return (
        <Box style={styles.container} bg={colorMode == "light" ? colors.white : colors.lightBlack}>
            <Pressable
                position='absolute'
                top={60}
                left={30}
                w={40}
                h={40}
                backgroundColor='rgba(19,19,19,0.3)'
                zIndex={99}
                borderRadius={50}
                alignItems='center'
                justifyContent='center'
                onPress={() => { navigation.goBack(); }}>
                <MaterialIcons name='arrow-back-ios-new' color={colors.white} size={20} />
            </Pressable>
            <Box position='absolute'
                top={60}
                right={30}
                w={40}
                h={40}
                backgroundColor='rgba(19,19,19,0.3)'
                zIndex={99}
                borderRadius={50}
                alignItems='center'
                justifyContent='center'>
                <DetailPopupMenu />
            </Box>

            <Box w={width} h={height * 0.7}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('PhotoDetailScreen', { item });
                    }}>
                    <Image
                        source={images[item.image]}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                </Pressable>
            </Box>
            <HStack w={width} height={80} paddingHorizontal={25} paddingTop={20} bg={colorMode == "light" ? colors.white : colors.lightBlack} gap={32} >
                <VStack gap={10}>
                    <Input h={30} w={200} borderColor={colorMode == "light" ? colors.white : colors.lightBlack} isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <InputField color={colorMode == "light" ? colors.black : colors.white} value={title} onChangeText={titleChange} style={styles.title} />
                    </Input>
                    <HStack gap={0}>
                        <MaterialIcons name='location-on' color={colorMode == "light" ? colors.darkGreen : colors.lightGreen} size={20} style={{ position: 'absolute', left: 10, zIndex: 99 }} />
                        <Input h={20} w={100} ml={20} pb={1} borderColor={colorMode == "light" ? colors.white : colors.lightBlack} isDisabled={false} isInvalid={false} isReadOnly={false}>
                            <InputField color={colorMode == "light" ? colors.darkGreen : colors.lightGreen} value={location} onChangeText={locationChange} style={styles.locationName} />
                        </Input>
                    </HStack>
                </VStack>
                <VStack gap={10}>
                    {cart.some((value) => value.id == item.id) ? (
                        <Pressable
                        pl={75}
                        pt={5}
                        onPress={() => removeItemFromFavorite(item)}>
                            <MaterialIcons name='bookmark' color={colorMode == "light" ? colors.darkGreen : colors.lightGreen} size={25} />
                    </Pressable>
                    ) : (
                        <Pressable
                        pl={75}
                        pt={5}
                        onPress={() => addItemToFavorite(item)}>
                            <MaterialIcons name='bookmark-outline' color={colorMode == "light" ? colors.darkGreen : colors.lightGreen} size={25} />
                    </Pressable>
                    )}
                    <HStack gap={7}>
                        <FontAwesome name='calendar' size={18} color={colorMode == "light" ? colors.darkGray : colors.white} />
                        <Text color={colorMode == "light" ? colors.darkGray : colors.white} style={styles.fullDate}>{item.date}</Text>
                    </HStack>
                </VStack>
            </HStack>
            <ScrollView>
                <Box paddingHorizontal={33} pt={20} justifyContent='center' alignItems='center'>
                    <Text fontSize={14} color={colorMode == "light" ? colors.darkGray : colors.white}>{item.content}</Text>
                </Box>
            </ScrollView>

        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
    },
    locationName: {
        fontSize: 14,
        paddingTop: 2,
        fontWeight: '500',
    },
    Icon: {
        width: 20,
        height: 20,
    },
    fullDate: {
        fontSize: 16,
        paddingTop: 1,
        fontWeight: '500',
    }
});

export default DetailScreen;