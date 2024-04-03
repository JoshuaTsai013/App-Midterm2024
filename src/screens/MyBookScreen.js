import React from 'react';
import {
    Box, VStack,
    Center,
    Text, Pressable, HStack,
} from '@gluestack-ui/themed';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import image from "../../image/hi.jpeg"

const ActionScreen = ({ onClose, site }) => {

    return (

        <VStack w="100%" bg="white" borderRadius={20} >
            <HStack ml={20} mr={20} mt={10} mb={10} justifyContent='space-between'>
                <HStack gap={5}>
                    <MaterialCommunityIcons name="calendar" color="#146D08" size={25} />
                    <Text fontSize={20} fontWeight='700' letterSpacing={1} color='#131313'>2022/1/13</Text>
                </HStack>
                <Text mt={3} color='#131313' fontWeight='700'>木柵動物園</Text>
            </HStack>
            <Center>
                <HStack gap={10}>
                    <Box>
                        <Image
                            style={{
                                height: 230,
                                width: 220,
                                borderRadius: 20,
                            }}
                            source={
                                require("../../image/hi.jpeg")
                            }
                        />
                    </Box>
                    <VStack gap={10}>
                    <Image
                            style={{
                                height: 110,
                                width: 110,
                                borderRadius: 20,
                            }}
                            source={
                                require("../../image/hi.jpeg")
                            }
                        />
                        <Image
                            style={{
                                height: 110,
                                width: 110,
                                borderRadius: 20,
                            }}
                            source={
                                require("../../image/hi.jpeg")
                            }
                        />
                    </VStack>
                </HStack>
            </Center>
            <Box>
                <VStack mt={10} ml={30} gap={20} >
                    <Text fontSize={27} fontWeight='900' color='#131313'>動物園一日遊</Text>
                </VStack>
                <Center>
                    <Pressable mt={10}
                        justifyContent="center"
                        w={190}
                        h={36}
                        borderRadius={20}
                        backgroundColor="#146D08"
                        onPress={() => Linking.openURL()}
                    >
                        <Text
                            color="#fff"
                            textAlign='center'
                            fontSize={14}
                            fontWeight='700'
                            lineHeight={16}
                            letterSpacing={1.2}
                        >查看更多</Text>
                    </Pressable>
                </Center>
            </Box>
        </VStack>
    );
};

export default ActionScreen;