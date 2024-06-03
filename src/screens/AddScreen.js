import React, { useState } from 'react';
import { HStack, Box, Text, Divider, VStack, Center, Input, InputField, View } from "@gluestack-ui/themed";
import { StyleSheet, Image, ScrollView, Dimensions, _ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from '../json/MapViewStyle.json'
import { Marker } from 'react-native-maps';
import { data, region } from "../components/Data"

const AddScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [date, setDate] = useState("Enter Date");
    const dateChange = (value) => {
        setDate(value);
    };
    const [title, setTitle] = useState("Enter Title");
    const titleChange = (value) => {
        setTitle(value);
    };
    const [content, setContent] = useState("Enter Memories");
    const contentChange = (value) => {
        setContent(value);
    };

    return (
        <Box flex={1} p={15} pb={100} pt={40} bgColor={colors.white}>
            {/* Date */}
            <Box flex={1.2} mb={10} paddingHorizontal={60} borderRadius="50%" bgColor={colors.lightGreen} style={styles.shadow}>
                <Center h="100%">
                    <Input borderColor={colors.lightGreen} isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <Center h="100%">
                            <InputField color={colors.white} value={date} onChangeText={dateChange} style={styles.input} />
                        </Center>
                    </Input>
                </Center>
            </Box>
            {/* Title */}
            <Box flex={1.2} mb={10} paddingHorizontal={60} borderRadius="50%" bgColor={colors.darkGreen} style={styles.shadow}>
                <Center h="100%">
                    <Input borderColor={colors.darkGreen} isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <Center h="100%">
                            <InputField color={colors.white} value={title} onChangeText={titleChange} style={styles.input} />
                        </Center>
                    </Input>
                </Center>
            </Box>
            {/* Photo and Type */}
            <Box flex={3} mb={10} borderRadius={30} style={styles.shadow}>
                <HStack h="100%">
                    <Box flex={1} mr={20} borderRadius={30}>
                        <Image
                            source={require('../../image/CKS_MH.jpg')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </Box>
                    <Box flex={1} borderRadius={30} bgColor={colors.darkGray}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <VStack>
                                <Center gap={8} paddingVertical={20} borderRadius={30}>
                                    <Text color={colors.white} fontSize={16} m={4}>New Journey</Text>
                                    <Divider my="$0.6" bg={colors.lightGray} />
                                    <Text color={colors.white} fontSize={16} m={4}>出門踏青</Text>
                                    <Divider my="$0.6" bg={colors.lightGray} />
                                    <Text color={colors.white} fontSize={16} m={4}>探索台北</Text>
                                    <Divider my="$0.6" bg={colors.lightGray} />
                                    <Text color={colors.white} fontSize={16} m={4}>滷肉飯之旅</Text>

                                </Center>
                            </VStack>
                        </ScrollView>
                    </Box>
                </HStack>
            </Box>
            {/* Map */}
            <Box flex={3} mb={10} borderRadius={30} bgColor={colors.darkGreen} style={styles.shadow}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={MapViewStyle}
                    initialRegion={region}
                    showsUserLocation={true}
                    region={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: region.latitudeDelta,
                        longitudeDelta: region.longitudeDelta
                    }}>
                    {data.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: 0.3,
                                },
                            ],
                        };
                        return (
                            <Marker
                                coordinate={marker.coordinate}
                                key={index}
                            >
                                <View style={styles.markerWrap}>
                                    <Image
                                        source={require('../../image/locationIcon.png')}
                                        style={[styles.marker, scaleStyle]}
                                        resizeMode="cover" />
                                </View>
                            </Marker>
                        );
                    })}
                </MapView>

            </Box>
            {/* Text input */}
            <Box flex={3} mb={10} borderRadius={30} p={20} bgColor={colors.lightGray} style={styles.shadow}>
                <Input borderColor={colors.lightGray} isDisabled={false} isInvalid={false} isReadOnly={false}>
                    <InputField color={colors.black} value={content} onChangeText={contentChange} style={styles.contentInput} />
                </Input>
            </Box>
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