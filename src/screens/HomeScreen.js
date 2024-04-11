import React from "react";
import { Box } from "@gluestack-ui/themed"
import BookList from "../components/BookList";
import sections from "../json/JournalContent.json";

const HomeScreen = ({ navigation }) => {
    return (
        <>
            <Box bgColor="white" height="100%">
                <Box bgColor="black" height={200}>
                </Box>
                <Box bgColor="white" height="100%">
                    <BookList
                        sections={sections}
                        navigation={navigation}
                    />
                </Box>

            </Box>

        </>
    );
};

export default HomeScreen;