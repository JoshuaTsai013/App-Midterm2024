import React from 'react';
import { Linking, Image } from 'react-native';
import StarList from '../components/StarList'
import { HStack, Center, ScrollView, Box, Text, Pressable } from "@gluestack-ui/themed";

const DetailScreen = ({ route }) => {
    const { title,
        artist,
        star,
        url,
        image,
        description
    } = route.params;
    const buttontitle = `Buy Now for $${star}`
    return (
        <Center height="100%">
            <ScrollView bgColor='#fff' w='100%' h='100%'>
                <Center style={{}}>
                    <Box mt="$5" style={{}}>
                        <Image
                            style={{
                                height: 300,
                                width: 210
                            }}
                            source={{
                                uri: image
                            }}
                        />
                    </Box>
                    <Center mt="$5" style={{}}>
                        <Text color='#131313'
                            textAlign='center'
                            fontSize={24}
                            lineHeight={28}
                        >{title}</Text>
                        <Text color='#666666'
                            textAlign='center'
                            fontSize={14}
                            fontWeight='400'
                            lineHeight={16}
                            mt={10}
                        >{artist}</Text>
                        <HStack mt={20}>
                            <StarList star={star} size={20} />
                            <Text fontSize={14}
                                fontWeight='400'
                                letterSpacing={1}
                                pt={2}
                                pl={5}
                            >{star}.0/5.0</Text>
                        </HStack>
                        <Text mt={20}
                            color='#131313'
                            textAlign='center'
                            fontSize={14}
                            fontWeight='400'
                            lineHeight={24}
                        >{description}</Text>
                    </Center>
                    <Pressable mt={20}
                        justifyContent="center"
                        w={190}
                        h={36}
                        borderRadius={4}
                        backgroundColor="#6200EE"
                        onPress={() => Linking.openURL(url)}
                    >
                        <Text
                            color="#fff"
                            textAlign='center'
                            fontSize={14}
                            fontWeight='700'
                            lineHeight={16}
                            letterSpacing={1.2}
                        >{buttontitle}</Text>
                    </Pressable>
                </Center>
            </ScrollView>
        </Center>
    );
}
export default DetailScreen;