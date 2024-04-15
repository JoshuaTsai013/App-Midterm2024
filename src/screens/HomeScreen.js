import React from "react";
import { HStack, Box, Text, Pressable, VStack, Center} from "@gluestack-ui/themed";
import { StyleSheet, Image, ScrollView, Dimensions, Platform, _ScrollView } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { data, region } from "../components/Data"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <Box>
            <Box bgColor="white" height="100%">
                <Center h={200} bgColor={colors.lightGreen}>
                <Text style={styles.title}>wander</Text>
                    </Center>
               

                <ScrollView>
                    {data.map((testItem, testIndex) => (

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
                                    source={testItem.image}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            </Pressable>
                            <VStack gap={5} style={styles.textContent}>
                                <Text
                                    color={colors.black}
                                    numberOfLines={1}
                                    style={styles.cardtitle}
                                >{testItem.title}</Text>
                                <HStack
                                    gap={5}
                                    mt={20}
                                    ml={2}
                                >
                                    <FontAwesome
                                        name='calendar-o'
                                        size={16}
                                        color={colors.darkGreen}
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
                                    mt={20}
                                    ml={2}
                                >
                                    <FontAwesome6
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
                    <Box height={80}>

                    </Box>
                </ScrollView>
                <Box height="90">

                </Box>
            </Box>


        </Box>


    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: "bold",
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

});

export default HomeScreen;