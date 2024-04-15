import { View, FlatList, StyleSheet, Image, ScrollView, Dimensions, Platform, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { testdata } from '../components/Data';
import RenderItem from '../components/RenderItem';
import { HStack, Center, Box, Text, Pressable, VStack } from "@gluestack-ui/themed";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('screen')

const DetailScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [toggle, setToggle] = useState(true);
    const toggleFunction = () => {
        setToggle(!toggle);
    };

    return (
        <Box style={styles.container}>
            <Pressable
                position='absolute'
                top={60}
                left={30}
                w={40}
                h={40}
                backgroundColor='rgba(19,19,19,0.3)'
                zIndex={99}
                borderRadius={50}
                alignItems='center'
                justifyContent='center'
                onPress={() => { navigation.goBack(); }}>
                <MaterialIcons name='arrow-back-ios-new' color={colors.white} size={20} />
            </Pressable>
            <Pressable
                position='absolute'
                w={40}
                h={40}
                top={60}
                right={30}
                backgroundColor='rgba(19,19,19,0.3)'
                borderRadius={50}
                alignItems='center'
                justifyContent='center'
                zIndex={99}
                onPress={() => toggleFunction()}>
                {toggle ?
                    <MaterialIcons name='bookmark-outline' color={colors.white} size={20} /> :
                    <MaterialIcons name='bookmark' color={colors.white} size={20} />}
            </Pressable>
            <FlatList
                horizontal
                pagingEnabled
                keyExtractor={item => item.id.toString()}
                data={testdata}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <Box style={{ width, height: height / 1.4 }}>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('PhotoDetailScreen', { item });
                            }}>
                            <Image
                                source={item.image}
                                style={{ width: '100%', height: 400, resizeMode: 'cover' }}
                            />
                        </Pressable>
                    </Box>;
                }}
            />
            <HStack paddingHorizontal={30} paddingVertical={10} gap={130}>
                <VStack gap={10}>
                    <Text style={styles.title}>環遊世界</Text>
                    <HStack pl={2} gap={5}>
                        <MaterialIcons name='location-on' color={colors.darkGray} size={20} />
                        <Text color={colors.darkGray} style={styles.locationName}>陽明山</Text>
                    </HStack>
                </VStack>
                <HStack gap={5} pt={5}>
                    <FontAwesome name='calendar' size={20} color={colors.darkGreen} />
                    <Text color={colors.darkGreen} style={styles.fullDate}>7/22~7/25</Text>
                </HStack>
            </HStack>
            <FlatList
                data={testdata}
                renderItem={({ item, index }) => {
                    return <RenderItem item={item} index={index} navigation={navigation} />;
                }}
                showsVerticalScrollIndicator={false}
            />
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        // marginHorizontal: 20,
        color: '#323232',
        fontWeight: '900',
    },
    locationName: {
        fontSize: 14,
        paddingTop: 2,
        fontWeight: '500',
    },
    Icon: {
        width: 20,
        height: 20,
    },
    fullDate: {
        fontSize: 14,
        paddingTop: 2,
        fontWeight: '500',
    }
});

export default DetailScreen;