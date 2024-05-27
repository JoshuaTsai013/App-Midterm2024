import React from "react";
import { HStack, Box, Text, Pressable, VStack, Center, Menu, MenuItem, Icon, MenuIcon, MenuItemLabel, Button, ButtonText } from "@gluestack-ui/themed";
import { StyleSheet, Image, ScrollView, Dimensions, Platform, _ScrollView } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { data, region } from "../components/Data"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useFonts } from 'expo-font'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [fontsLoaded] = useFonts({
        'Lugrasimo-Regular': require('../../assets/fonts/Lugrasimo-Regular.ttf')
    })
    if (!fontsLoaded) {
        return undefined;
    }

    return (
        <Box>
            <Box bgColor="white" height="100%" alignItems="center">
                <Center h='15%' mb={10} bgColor={colors.white}>
                    <Text color={colors.darkGreen} style={styles.title}>wander</Text>
                </Center>

                <Menu
                    placement="bottom end"
                    borderColor={colors.lightGray}
                    borderWidth={1}
                    w={100}
                    h={100}
                    trigger={({ ...triggerProps }) => {
                        return (
                            <Button
                                w={35}
                                h={40}
                                borderRadius={100}
                                bgColor={colors.lightGray}
                                position='absolute'
                                right={15}
                                top={80}
                                {...triggerProps}>
                                <Icon as={MenuIcon} size="md" />
                            </Button>
                        );
                    }}
                >
                    <MenuItem w='100%' h={30} key="Settings" textValue="Settings">
                        <MenuItemLabel w='100%' h={30} size='sm'>
                            Add
                        </MenuItemLabel>
                    </MenuItem>
                    <MenuItem w='100%' h={30} key="Setti" textValue="Settings">
                        <MenuItemLabel w='100%' h={30} size='sm'>
                            All
                        </MenuItemLabel>
                    </MenuItem>
                    <MenuItem w='100%' h={30} key="Add account" textValue="Add account">
                        <MenuItemLabel w='100%' h={30} size='sm'>
                            Favorites
                        </MenuItemLabel>
                    </MenuItem>
                </Menu>


                <ScrollView
                  showsVerticalScrollIndicator={false}>
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
        elevation: 5,
    },
    cardImage: {
        flex: 2.4,
        marginLeft:15,
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