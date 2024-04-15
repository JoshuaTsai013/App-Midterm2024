import { View, FlatList, StyleSheet, Image, ScrollView, Dimensions, Platform, useWindowDimensions } from 'react-native';
import { HStack, Center, Box, Text, Pressable, VStack, Divider } from "@gluestack-ui/themed";
import React from 'react';
import { testdata } from '../components/Data';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const RenderItem = ({ item, index, navigation }) => {
    const { colors } = useTheme();

    return (
        <Animated.View entering={FadeInDown.delay(200 * index)}>
            <HStack
                marginHorizontal={20}
                marginVertical={10}
                alignItems='center'
            >
                <Divider
                    orientation="vertical"
                    mx={0}
                    bg={colors.darkGreen}
                    h={20}
                    w={3}
                    $dark-bg={colors.lightGreen} />
                <Text
                    pl={15}
                    fontSize={20}
                    fontWeight='600'
                    color={colors.darkGreen}
                >{item.title}</Text>
                <Text
                    position='absolute'
                    bottom={3}
                    right={7}
                    fontSize={16}
                    fontWeight='600'
                >{item.date}</Text>
            </HStack>
            <Pressable
                bgColor={colors.white}
                shadowColor={colors.black}
                style={styles.container}
                onPress={() => {
                    navigation.navigate('PhotoDetailScreen', { item });
                }}>
                <Animated.Image
                    source={item.image}
                    style={styles.image}
                />
                <HStack position='absolute' bottom={15} left={15}>
                    <MaterialIcons name='location-on' color={colors.white} size={20} />
                    <Text color={colors.white} fontSize={13} pt={2} fontWeight='bold'>{item.location}</Text>
                </HStack>
                <Box style={styles.textContainer}>
                    <Text pb={30} pl={12} pt={12} color={colors.darkGray} style={styles.content}>{item.content}</Text>
                    <Pressable
                        position='absolute'
                        bottom={0}
                        left={155}
                        bgColor={colors.darkGreen}
                        style={styles.editButton}>
                        <MaterialIcons name='mode-edit' color={colors.white} size={16} />
                    </Pressable>
                </Box>
            </Pressable>
        </Animated.View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
    },
    image: {
        width: 140,
        height: '100%',
        minHeight: 140,
        borderRadius: 20,
    },
    textContainer: {
        flexShrink: 1,
    },
    content: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    editButton: {
        width: 55,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editIcon: {
        width: 14,
        height: 14,
    },
});