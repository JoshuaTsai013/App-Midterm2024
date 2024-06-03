import React, { useState } from 'react';
import { HStack, Box, Text, Divider, VStack, Center, Pressable, Input, InputField, View } from "@gluestack-ui/themed";
import { StyleSheet, Image, ScrollView, Dimensions, _ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { selectColorMode } from "../Redux/cartReducer";

import * as ImagePicker from "expo-image-picker"
import BlankPic from "../../image/BlankPic.png"
const DEFAULT_IMAGE = Image.resolveAssetSource(BlankPic).uri;

import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';
import { logStoredJSONFile, getStoredTripData } from '../components/Fs'



const AddScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const colorMode = useSelector(selectColorMode);
    //store Title
    const [title, setTitle] = useState("Enter Title");
    const titleChange = (value) => {
        setTitle(value);
    };
    //store content
    const [content, setContent] = useState("Enter Memories");
    const contentChange = (value) => {
        setContent(value);
    };
    //open camera and upload Image
    const [ImageUrl, setImageUrl] = useState(DEFAULT_IMAGE);
    //logStoredJSONFile('tripData.json')

    async function storeImageFile() {
        try {
            // 1. Request Permissions (Camera and Camera Roll)
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to take a photo!');
                return;
            }
            // 2. Launch Camera
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                // 3. Process Camera Image
                const imageUri = result.assets[0].uri;
                const filename = `image_${Date.now()}.jpg`;
                const fileDestination = FileSystem.documentDirectory + filename;

                // Option A: Copy directly if URI is a file path
                if (imageUri.startsWith('file://')) {
                    await FileSystem.copyAsync({ from: imageUri, to: fileDestination });
                } else {
                    // Option B: Download if URI is not a file path
                    await FileSystem.downloadAsync(imageUri, fileDestination);
                }

                console.log('Image file saved successfully!', fileDestination);
                //return fileDestination; // Return the saved file path
                setImageUrl(fileDestination)
            }
        } catch (error) {
            console.error('Error storing image file:', error);
            throw error;
        }
    }

    async function storeTripData(title, content, ImageUrl) {
        const filename = 'tripData.json';
        const fileUri = FileSystem.documentDirectory + filename;

        const newTripData = {};

        newTripData.coordinate = {
            latitude: parseFloat(25.035715839990768),
            longitude: parseFloat(121.52021538299306),
        };
        newTripData.id = uuid.v4(); // uuid
        newTripData.title = title;
        newTripData.date = getFormattedDate();
        newTripData.locaion = "台北市";
        newTripData.category = "景點";
        newTripData.content = content;
        newTripData.image = ImageUrl;

        try {
            // 1. Read Existing Data (If Any)
            let trips = new Array();
            try {
                const fileContent = await FileSystem.readAsStringAsync(fileUri);
                trips = JSON.parse(fileContent);
                console.log("storeTripData Log:", trips)
            } catch (readError) {
                // If the file doesn't exist yet, start with an empty array
                
                    console.error('Error reading existing data:', readError);
                
            }

            // 2. Add New Trip Data to Array
            trips.push(newTripData); // Append the new trip to the array

            // 3. Write Updated Array as JSON
            const updatedJsonString = JSON.stringify(trips);
            await FileSystem.writeAsStringAsync(fileUri, updatedJsonString);

            console.log('Trip data saved successfully!');
            //logStoredJSONFile('tripData.json')
        } catch (error) {
            console.error('Error saving trip data:', error);
        }
    }


    // async function storeJSONData(title, content, ImageUrl) {

    //     const newTripData = {};

    //     newTripData.coordinate = {
    //         latitude: parseFloat(25.035715839990768),
    //         longitude: parseFloat(121.52021538299306),
    //     };
    //     newTripData.id = uuid.v4(); // uuid
    //     newTripData.title = title;
    //     newTripData.date = getFormattedDate();
    //     newTripData.locaion = "台北市";
    //     newTripData.category = "景點";
    //     newTripData.content = content;
    //     newTripData.image = ImageUrl;

    //     const filename = 'tripData.json';
    //     const fileUri = FileSystem.documentDirectory + filename;

    //     try {
    //         const jsonString = JSON.stringify(newTripData);
    //         await FileSystem.writeAsStringAsync(fileUri, jsonString);
    //         console.log('JSON data saved successfully!');
    //         logStoredJSONFile('tripData.json')
    //     } catch (error) {
    //         console.error('Error saving JSON data:', error);
    //     }
    // }

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(now.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    }

    //aaaaaaaaaaaaa
    return (
        <Box flex={1} p={15} pb={20} pt={20} bg={colorMode == "light" ? colors.white : colors.lightBlack}>
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
                    console.log(ImageUrl);
                    storeImageFile();

                }}>
                    <Image
                        source={{ url: ImageUrl }}
                        //source={{url:DEFAULT_IMAGE}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </Pressable>

            </Box>
            {/* {Location} */}
            <HStack>
                <Box flex={1} height={40} mb={10} paddingHorizontal={5} marginHorizontal={5} borderRadius="14" bgColor={colors.darkGray} style={styles.shadow}>
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
                <Pressable flex={1} onPress={() => { navigation.navigate('HomeStack', { screen: 'Home' }); }}>
                    <Box height={60} mb={10} paddingHorizontal={5} marginHorizontal={5} borderRadius="20%" bgColor={colors.darkGray} style={styles.shadow}>
                        <Center h="100%">
                            <Text color={colors.white}>Cancel</Text>
                        </Center>
                    </Box>
                </Pressable>
                <Pressable flex={1} onPress={() => { storeTripData(title, content, ImageUrl) }}>
                    <Box height={60} mb={10} paddingHorizontal={5} marginHorizontal={5} borderRadius="20%" bgColor={colors.darkGreen} style={styles.shadow}>
                        <Center h="100%">
                            <Text color={colors.white}>save</Text>
                        </Center>
                    </Box>
                </Pressable>
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