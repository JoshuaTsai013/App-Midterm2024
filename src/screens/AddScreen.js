import React, { useState } from 'react';
import { HStack, Box, Text, Divider, VStack, Center, Input, InputField } from "@gluestack-ui/themed";
import { StyleSheet, Image, ScrollView, Dimensions, _ScrollView } from 'react-native';

import { useTheme } from '@react-navigation/native';


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
        //container
        <Box flex={1} p={15} pb={100} pt={40} bgColor={colors.white}>
            {/* Date */}
            <Box flex={1} mb={15} paddingHorizontal={60} borderRadius="50%" bgColor={colors.lightGreen}>
                <Center h="100%">
                    <Input borderColor={colors.lightGreen} isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <Center h="100%">
                            <InputField color={colors.white} value={date} onChangeText={dateChange} style={styles.input} />
                        </Center>
                    </Input>
                </Center>
            </Box>
            {/* Title */}
            <Box flex={1} mb={15} paddingHorizontal={60} borderRadius="50%" bgColor={colors.darkGreen}>
                <Center h="100%">
                    <Input borderColor={colors.darkGreen} isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <Center h="100%">
                            <InputField color={colors.white} value={title} onChangeText={titleChange} style={styles.input} />
                        </Center>
                    </Input>
                </Center>
            </Box>
            {/* Photo and Type */}
            <Box flex={3} mb={15} borderRadius={30} >
                <HStack h="100%">
                    <Box flex={1} mr={20} borderRadius={30}>
                        <Image
                            source={require('../../image/CKS_MH.jpg')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </Box>
                    <Box flex={1} borderRadius={30} bgColor={colors.lightGreen}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <VStack>
                                <Center paddingVertical={20} borderRadius={30}>
                                    <Divider my="$0.5" bg={colors.white}/>
                                    <Text color={colors.white} fontSize={25} m={4}>New Journey</Text>
                                    <Divider my="$0.5" bg={colors.white}/>
                                    <Text color={colors.white} fontSize={25} m={4}>出門踏青</Text>
                                    <Divider my="$0.5" bg={colors.white}/>
                                    <Text color={colors.white} fontSize={25} m={4}>探索台北</Text>
                                    <Divider my="$0.5" bg={colors.white}/>
                                    <Text color={colors.white} fontSize={25} m={4}>滷肉飯之旅</Text>
                                    <Divider my="$0.5" bg={colors.white}/>
                                </Center>
                            </VStack>
                        </ScrollView>
                    </Box>
                </HStack>
            </Box>
            {/* Map */}
            <Box flex={3} mb={15} borderRadius={30} bgColor={colors.darkGreen}>

            </Box>
            {/* Text input */}
            <Box flex={3} mb={15} borderRadius={30} p={20} bgColor={colors.lightGray}>
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

    }

});

export default AddScreen;