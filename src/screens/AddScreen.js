import React from "react";
import { HStack, Box, Text, Pressable, VStack, Center, View } from "@gluestack-ui/themed";
import { StyleSheet, Image, ScrollView, Dimensions, Platform, _ScrollView } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { data, region } from "../components/Data"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const AddScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        
            <Box flex={1} m={15} mb={100} bgColor={colors.lightGreen}>
                <Text>111</Text>
                <Box h={50} w={50} mt={100} bgColor={colors.DarkGreen}/>
                
            </Box>
        
    );
};
const styles = StyleSheet.create({
    container: {
        flex:1,
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
    }

});

export default AddScreen;