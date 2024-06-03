import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { HStack, Center, Box, Text, Pressable, Input, InputSlot, InputIcon, SearchIcon, InputField } from "@gluestack-ui/themed";
import { View, StyleSheet, FlatList, Image, Animated, ScrollView, Dimensions, Platform, useWindowDimensions, TextInput } from 'react-native';
import MyTheme from '../theme';
import { FadeInLeft } from 'react-native-reanimated';
import ActionSheet from 'react-native-actionsheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { data, testdata, region } from "../components/Data"
import testdata from '../json/Data.json';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/image'; 


export default function SearchScreen({ navigation, route }) {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const [list, setList] = useState([]);
    const [search, setSearch] = useState(null);
    const filterList = (keyword) => {
        if (!keyword) {
            setList([]); // 如果搜索關鍵字為空，清空列表
        } else {
            // 模擬異步搜索，這裡可以替換為實際的搜索邏輯
            setTimeout(() => {
                const filteredList = testdata.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
                setList(filteredList);
            }, 300); // 延遲300ms以模擬搜索
        }
    };

    useEffect(() => {
        if (search !== null) {
            filterList(search);
        }
    }, [search]);

    return (
        <Box w={width} bgColor={colors.white} style={styles.container}>
            <Pressable position='absolute' top={80} left={20} onPress={() => { navigation.goBack(); }}>
                <MaterialIcons
                    name='clear'
                    size={26}
                    color="#000"
                />
            </Pressable>
            <Box position='absolute' top={65} left={45} right={15} style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder="搜尋..."
                    onChangeText={(val) => setSearch(val)}
                />
            </Box>
            <Box w='100%' mt={150} ml={7}>
                <FlatList
                    data={list}
                    key={({ item }) => item.value}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('DetailScreen', { item: item });
                                }}>
                                <HStack gap={30} p={10} ml={30} alignItems='center'>
                                    <Image
                                        source={images[item.image]}
                                        style={styles.image} />
                                    <Text style={styles.listText}>{item.title}</Text>
                                    <Box position='absolute' left={300}>
                                        <MaterialIcons
                                            name='navigate-next'
                                            size={26}
                                            color={colors.darkGray}
                                        />
                                    </Box>
                                </HStack>
                            </Pressable>
                        )
                    }}
                />
            </Box>
        </Box >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius:5,
    },
    actionButton: {
        width: 23,
        height: 23
    },
    input: {
        paddingHorizontal: 10,
    },
    search: {
        backgroundColor: '#EBE9E9',
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
})