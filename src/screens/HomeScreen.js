import React from "react";
import { Box } from "@gluestack-ui/themed"
import JourneyList from "../components/JourneyList";
import sections from "../json/JournalContent.json";
import { useTheme } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <>
            <Box bgColor="white" height="100%">
                <Box bgColor={colors.darkGreen} height={200}>
                </Box>
                <Box bgColor="white" height="100%">
                    <JourneyList
                        sections={sections}
                        navigation={navigation}
                    />
                </Box>

            </Box>

        </>
    );
};

export default HomeScreen;