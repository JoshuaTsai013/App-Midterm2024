import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Animated, Dimensions, Platform } from 'react-native';
import { HStack, Center, Box, Text, Pressable } from "@gluestack-ui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { data, tabs } from '../components/test'
import { FlatList, SectionList } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';


const WishListScreen = ({ navigation }) => {
    const scrollX=useRef(new Animated.Value(0)).current;
    return (
        <ScrollView>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                snapToInterval={450}
                // snapToAlignment="center"
                decelerationRate='fast'
                keyExtractor={(item, index) => `${item}-${index}`}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                //     { useNativeDriver: true }
                // )}
                renderItem={({ item ,index}) => {
                    // const inputRange = [
                    //     (index - 1) * 450,
                    //     index * 450,
                    //     (index + 1) * 450]
                    // const scale = scrollX.interpolate({
                    //     inputRange,
                    //     outputRange: [1, 1.1, 1],
                    // });
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('AccountScreen', { item }); }}
                            style={{ width: 450 }}
                        >
                            <Box style={[
                                // StyleSheet.absoluteFillObject,
                                // { overflow: 'hidden' }
                            ]}>
                                <Image source={item.image} style={styles.image}
                                    // style={[StyleSheet.absoluteFillObject,
                                    // {
                                    //     resizeMode: 'cover',
                                    //     width:450,
                                    //     height:300,
                                    //     transform: [{ scale }]
                                    // }
                                    // ]} 
                                    />
                                {/* <Box>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.location}>{item.location}</Text>
                                    </Box> */}
                            </Box>
                        </TouchableOpacity>
                    )
                }
                }
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    pillText: {},
    title: {
        fontWeight: '800',
        fontSize: 22,

    },
    location: {
        fontSize: 12,
        opacity: 0.8,
    },
    image: {
        width: '100%',
        height: 300,

    },
})

export default WishListScreen;