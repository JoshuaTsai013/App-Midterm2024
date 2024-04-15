import React, { useState } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Divider, Center, Image, Box, Text, Pressable } from '@gluestack-ui/themed';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen'
import AddScreen from '../screens/AddScreen'
import SettingScreen from '../screens/SettingScreen';
import PhotoDetailScreen from '../screens/PhotoDetailScreen'
import NullScreen from '../screens/NullScreen';
import MyTheme from '../theme';
import Animated from 'react-native-reanimated';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const Navigation = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <MyDrawer />
        </NavigationContainer>
    );
}
const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}
            contentContainerStyle={{ paddingTop: 0 }}

        >
            <Box h={180} justifyContent='center'>
                <Center pt={50} pr={150}>
                    <Animated.Image
                        h={48}
                        w={48}
                        borderRadius={999}
                        mb={10}
                        source={{
                            uri: 'https://s3-alpha-sig.figma.com/img/a14c/921b/dcea36fbb59ee6c44fdec352c284fb5b?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AyaCYlh27eIYoF-2guDSrpqgnRLhWWxiDkXCz-VX5him7p~wdXuPxHXmtBs1dRFJdjagDxhdIyQlEXhiNk5MDGAisqZTEbT7cQboGeCAICLwZDbAboBQ06jHmPZSQ-DVQ3YNPWzZIkZgf2JsXxTZwD0TiskicoZeoIz~Vtg1INdOk-hJtuwSjJB-YcJQ0R2PIhpUZn4Jy-GMMQ3KkIk3ympb0RJpOxRYSDGQ3rwg9SQSwkqVwaHiOdXVTHfCsjp6WcEPpA8DF8ZkhV0sNWs-GNO-7C7PsCh74N0n7QN52hUhKllidmSTyxdJSIq~aZWcRcGczUud0mANI9CqkF58lw__'
                        }}
                        alt='albumImage'
                    />
                    <Text fontWeight='500'
                        color='#131313'
                        fontSize={24}
                        lineHeight={28}
                    >wander</Text>
                </Center>
            </Box>
            <Divider my="$2" />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const MyDrawer = () => {
    const { colors } = useTheme();

    return (
        <Drawer.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                drawerActiveBackgroundColor: colors.darkGreen,
                drawerActiveTintColor: colors.white,
                drawerStyle: { width: 250 },
                drawerLabelStyle: { fontSize: 14, fontWeight: '400', lineHeight: 16 },
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="MyTabs"
                component={MyTabs}
                options={{
                    headerShown: false,
                    drawerLabel: "Home",
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Setting"
                component={SettingsStack}
                options={{
                    headerShown: false,
                    drawerLabel: "Setting",
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={26} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
const MyTabs = () => {
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                tabBarActiveTintColor: colors.darkGreen,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: -20,
                    left: 0,
                    right: 0,
                    elevation: 0, // 避免底部陰影
                    backgroundColor: 'white', // 背景顏色
                    borderTopWidth: 1, // 移除頂部邊框線
                    height: 90, // Tab Bar 的高度
                },
                tabBarItemStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                },
            }}

        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    headerShown: false,
                    title: '',
                    tabBarIconStyle: {
                        marginLeft: 60,
                    },
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="AddStack"
                component={AddStack}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Box >
                            <Ionicons position='absolute' zIndex={10} bottom={-10} left={-35} name="add-circle-sharp" color='#466A47' size={70} style={{ marginTop: -55 }} />
                            <Box w={50} h={50} position='absolute' zIndex={0} borderRadius={50} bottom={0} left={-25} backgroundColor='#fff' />
                        </Box>
                    ),
                }}
            />
            <Tab.Screen
                name="MapStack"
                component={MapStack}
                options={{
                    title: '',
                    tabBarIconStyle: {
                        marginRight: 60,
                    },
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book-open" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
const SettingsStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    title: "Settings",
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontSize: 20
                    },
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name={'menu'}
                            size={20}
                            onPress={() => navigation.openDrawer()}
                            style={{ marginRight: 20 }}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const MapStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade'
                }}
            />
            <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade'
                }}
            />
            <Stack.Screen
                name="PhotoDetailScreen"
                component={PhotoDetailScreen}
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade'
                }}
            />
        </Stack.Navigator>
    );
}
const HomeStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: null,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name={'menu'}
                            size={20}
                            onPress={() => navigation.openDrawer()}
                            style={{ marginRight: 20 }}
                        />
                    ),
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="magnify"
                            size={26}
                            onPress={() => alert('查不到')}
                            style={{}}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
const AddStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Add"
                component={AddScreen}
                options={{
                    // title: null,
                    // headerShown:false,
                    // headerShadowVisible: false,
                    // headerLeft: () => (
                    //     <MaterialCommunityIcons
                    //         name={'menu'}
                    //         size={20}
                    //         onPress={() => navigation.openDrawer()}
                    //         style={{ marginRight: 20 }}
                    //     />
                    // ),
                    // headerRight: () => (
                    //     <MaterialCommunityIcons
                    //         name="magnify"
                    //         size={26}
                    //         onPress={() => alert('查不到')}
                    //         style={{}}
                    //     />
                    // ),
                }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default Navigation;