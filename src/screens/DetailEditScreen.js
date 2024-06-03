import { View, FlatList, StyleSheet, Image, ScrollView, TextInput, Dimensions, Platform, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderItem from '../components/RenderItem';
import { HStack, Center, Box, Text, Pressable, VStack, Input, InputField } from "@gluestack-ui/themed";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { testdata } from '../components/Data';

const { width, height } = Dimensions.get('screen')

const DetailScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const { item } = route.params;
    const [data2Array, setData2Array] = useState(item.data2 ? Object.values(item.data2) : [item]);
    const lastDate = data2Array.slice(-1)[0];
    const firstDate = data2Array[0];
    const [fullDate, setfullDate] = useState(lastDate.date == firstDate.date ? lastDate.date : `${firstDate.date}~${lastDate.date}`);
    const [title, setTitle] = useState(item.title);
    const [location, setLocation] = useState(item.location);

    const [toggle, setToggle] = useState(true);
    const toggleFunction = () => {
        setToggle(!toggle);
    };
    const renderFooter = () => {
        return <Box h={100} />;
    };
    const titleChange = (value) => {
        setTitle(value);
    };
    const locationChange = (value) => {
        setLocation(value);
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
            {/* <Pressable
                position='absolute'
                top={60}
                right={30}
                w={40}
                h={40}
                backgroundColor='rgba(19,19,19,0.3)'
                zIndex={99}
                borderRadius={50}
                alignItems='center'
                justifyContent='center'
                onPress={() => { navigation.goBack(); }}>
                <SimpleLineIcons name='options-vertical' color={colors.white} size={20} />
            </Pressable> */}
            <Box w={width} h={650}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('PhotoDetailScreen', { item });
                    }}>
                    <Image
                        source={item.image}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                </Pressable>
            </Box>
            <HStack w={width} height={80} paddingHorizontal={30} paddingTop={20} bgColor={colors.white} gap={55} >
                <VStack gap={10}>
                    <Input h={30} w={200} borderColor={colors.white} isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <InputField color={colors.black} value={title} onChangeText={titleChange} style={styles.title} />
                    </Input>
                    <HStack gap={0}>
                        <MaterialIcons name='location-on' color={colors.darkGray} size={20} style={{ position: 'absolute', left: 10, zIndex: 99 }} />
                        <Input h={20} w={100} ml={20} pb={1} borderColor={colors.white} isDisabled={false} isInvalid={false} isReadOnly={false}>
                            <InputField color={colors.darkGray} value={location} onChangeText={locationChange} style={styles.locationName} />
                        </Input>
                    </HStack>
                </VStack>
                <VStack gap={10}>
                    <Pressable
                        pl={75}
                        pt={5}
                        onPress={() => toggleFunction()}>
                        {toggle ?
                            <MaterialIcons name='bookmark-outline' color={colors.darkGray} size={25} /> :
                            <MaterialIcons name='bookmark' color={colors.darkGreen} size={25} />}
                    </Pressable>
                    <HStack gap={7}>
                        <FontAwesome name='calendar' size={18} color={colors.darkGreen} />
                        <Text color={colors.darkGreen} style={styles.fullDate}>{fullDate}</Text>
                    </HStack>
                </VStack>
            </HStack>

            <Box paddingHorizontal={40} pt={20} justifyContent='center' alignItems='center'>
                <Text fontSize={16} >{item.content}</Text>
            </Box>

            {/* <FlatList
                style={{ paddingTop: 0,width:width,height:700 }}
                data={data2Array}
                renderItem={({ item, index }) => {
                    return <RenderItem item={item} index={index} navigation={navigation} />;
                }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderFooter} // 將底部組件設置為列表的底部
            /> */}

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
        fontSize: 16,
        paddingTop: 1,

        fontWeight: '500',
    }
});

export default DetailScreen;