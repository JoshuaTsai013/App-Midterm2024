import React, { useState } from 'react';
import { HStack, Box, Text, Divider, VStack, Center, Pressable, Input, InputField, View } from "@gluestack-ui/themed";
import { StyleSheet, Image, ScrollView, Dimensions, _ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from '../json/MapViewStyle.json'
import { Marker } from 'react-native-maps';
import { data, region } from "../components/Data"
import * as ImagePicker from "expo-image-picker"
import BlankPic from "../../image/BlankPic.png"
const DEFAULT_IMAGE = Image.resolveAssetSource(BlankPic).uri;


const AddScreen = ({ navigation }) => {
    const { colors } = useTheme();

    const [title, setTitle] = useState("Enter Title");
    const titleChange = (value) => {
        setTitle(value);
    };
    const [content, setContent] = useState("Enter Memories");
    const contentChange = (value) => {
        setContent(value);
    };

    const [ImageUrl, setImageUrl] = useState(DEFAULT_IMAGE);

    const uploadImage = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({ aspect: [3, 4], quality: 1 });
            if (!result.canceled) {
                await saveImage(result.assets[0].uri)
            }
        } catch (error) {
            alert("upload fail")
        }



    };

    const saveImage = async (image) => {
        try {
            
            setImageUrl(image);
            
        } catch (error) {

        }
    }


    return (
        <Box flex={1} p={15} pb={20} pt={20} bgColor={colors.white}>
            {/* Title */}
            <Box height={60} mb={10} paddingHorizontal={60} borderRadius="20%" bgColor={colors.darkGreen} style={styles.shadow}>
                <Center h="100%">
                    <Input borderColor={colors.darkGreen} isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <Center h="100%">
                            <InputField color={colors.white} value={title} onChangeText={titleChange} style={styles.input} />
                        </Center>
                    </Input>
                </Center>
            </Box>
            {/* Photo */}
            <Box flex={6} mb={10} borderRadius={30} style={styles.shadow}>
                <Pressable onPress={() => {
                    //console.log(typeof(ImageUrl));
                    uploadImage();
                    console.log(ImageUrl);
                }}>
                    <Image
                        source={{url:ImageUrl}}
                        //source={{url:DEFAULT_IMAGE}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </Pressable>
                
            </Box>
            {/* {Location} */}
            <HStack>
                <Box flex={1} height={40} mb={10} paddingHorizontal={5} marginHorizontal={5} borderRadius="14" bgColor={colors.darkGreen} style={styles.shadow}>
                    <Center h="100%">
                        <Text>Location</Text>
                    </Center>
                </Box>
                <Box flex={1} height={40} mb={10} paddingHorizontal={5} marginHorizontal={5} borderRadius="14" bgColor={colors.darkGreen} style={styles.shadow}>
                    <Center h="100%">
                        <Text>Location</Text>
                    </Center>
                </Box>
            </HStack>
            {/* Text input */}
            <Box flex={3} mb={10} borderRadius={30} p={20} bgColor={colors.lightGray} style={styles.shadow}>
                <Input borderColor={colors.lightGray} isDisabled={false} isInvalid={false} isReadOnly={false}>
                    <InputField color={colors.black} value={content} onChangeText={contentChange} style={styles.contentInput} />
                </Input>
            </Box>
            {/* Save Btn */}
            <HStack>
                <Pressable flex={1}
                    onPress={() => {
                        //navigation.navigate('root');
                        navigation.navigate('HomeStack', { screen: 'Home' });
                        //console.log("pressed");

                    }}
                >
                    <Box flex={1} height={60} mb={10} paddingHorizontal={5} marginHorizontal={5} borderRadius="20%" bgColor={colors.darkGreen} style={styles.shadow}>
                        <Center h="100%">
                            <Text>save</Text>
                        </Center>
                    </Box>
                </Pressable>
                <Box flex={1} height={60} mb={10} paddingHorizontal={5} marginHorizontal={5} borderRadius="20%" bgColor={colors.darkGreen} style={styles.shadow}>
                    <Center h="100%">
                        <Text>save</Text>
                    </Center>
                </Box>
            </HStack>
        </Box>
    );
};
const styles = StyleSheet.create({

    image: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderRadius: 30,
    },
    input: {
        fontSize: 30,
        fontWeight: 900,

    },
    contentInput: {
        fontSize: 15,
        fontWeight: 400,

    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }

});

export default AddScreen;