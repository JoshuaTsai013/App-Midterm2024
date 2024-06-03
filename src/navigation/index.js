import React, { useState } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Dimensions} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Divider, Center, Image, Box, Text, Pressable, HStack } from '@gluestack-ui/themed';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen'
import AddScreen from '../screens/AddScreen'
import SettingScreen from '../screens/SettingScreen';
import PhotoDetailScreen from '../screens/PhotoDetailScreen'
import NullScreen from '../screens/NullScreen';
import SearchScreen from '../screens/SearchScreen'
import MyTheme from '../theme';
import { useFonts } from 'expo-font'
import ColorModeBtn from "../components/ColorModeBtn";
import { useSelector } from "react-redux";
import { selectColorMode } from "../Redux/cartReducer";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTabs = createMaterialTopTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <MyTabs />
        </NavigationContainer>
    );
}
const CustomDrawerContent = (props) => {
    const { colors } = useTheme();
    const [fontsLoaded] = useFonts({
        'Lugrasimo-Regular': require('../../assets/fonts/Lugrasimo-Regular.ttf')
    })
    if (!fontsLoaded) {
        return undefined;
    }
    return (
        <DrawerContentScrollView {...props}
            contentContainerStyle={{ paddingTop: 0 }}
        >
            <Box h={180} justifyContent='center'>
                <Center pt={50}>
                    <Text fontWeight='500'
                        color={colors.darkGreen}
                        fontFamily='Lugrasimo-Regular'
                        fontSize={35}
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
function MyTopTabs() {
    const { colors } = useTheme();
    const colorMode = useSelector(selectColorMode);
    // bg={colorMode == "light" ? colors.white : colors.lightBlack}
    return (
        <TopTabs.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colorMode == "light" ? colors.white : colors.lightBlack, // 设置 tabBar 的背景色
                  },
                  tabBarIndicatorStyle: {
                    backgroundColor: colorMode == "light" ? colors.darkGreen : colors.lightGreen, // 设置底线颜色
                  },
                  tabBarLabelStyle: {
                    color: colorMode == "light" ? colors.black : colors.white, // 设置标签文字的颜色
                  },
            }}
        >
            <TopTabs.Screen
                name="條列"
                component={HomeStack}

            />
            <TopTabs.Screen
                name="地圖"
                component={MapStack}
            />
        </TopTabs.Navigator>
    );
}
const MyTabs = ({ navigation }) => {
    const { colors } = useTheme();
    const colorMode = useSelector(selectColorMode);
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                tabBarActiveTintColor: colorMode == "light" ? colors.darkGreen : colors.white,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: -20,
                    left: 0,
                    right: 0,
                    elevation: 0, // 避免底部陰影
                    backgroundColor: colorMode == "light" ? colors.white : colors.lightBlack, // 背景顏色
                    height: 90, // Tab Bar 的高度
                },
                tabBarItemStyle: {
                    flex: 1,
                },
            }}

        >
            <Tab.Screen
                name="HomeStack"
                component={MyTopTabs}
                options={({ navigation }) => ({
                    title: '',
                    tabBarIconStyle: {
                        marginTop: 15,
                    },
                    headerRight: () => (
                        <Box mr={20}>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('SearchScreen');
                                }}>
                                <MaterialCommunityIcons
                                    name='magnify'
                                    size={26}
                                    color={colorMode == "light" ? colors.black : colors.white} />
                            </Pressable>
                        </Box>
                    ),
                    headerLeft: () => (
                        <HStack alignItems='center' ml={20} gap={106}>
                            <ColorModeBtn />
                            <Text fontSize={22} color={colorMode == "light" ? colors.black : colors.white} fontWeight='bold' >我的日記</Text>
                        </HStack>
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                    headerStyle: {
                        borderBottomWidth: 0, // Remove the bottom line
                        elevation: 0, // Remove the shadow on Android
                        shadowOpacity: 0, // Remove the shadow on iOS
                        height: 100,
                        backgroundColor: colorMode == "light" ? colors.white : colors.lightBlack,
                    },
                })}
            />
            {/* <Tab.Screen
                name="AddStack"
                component={AddStack}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Box >
                            <MaterialCommunityIcons position='absolute' zIndex={10} borderRadius={50} bottom={4} left={-20.5} name="camera" color={colors.white} size={35} style={{ marginTop: -55 }} />
                            <Box w={64} h={64} position='absolute' zIndex={0} bottom={-10} left={-35} borderRadius={99} backgroundColor={colors.darkGreen} />
                        </Box>
                    ),
                }}
            /> */}
            <Tab.Screen
                name="SettingsStack"
                component={SettingsStack}
                options={{
                    title: '',
                    tabBarIconStyle: {
                        
                        marginTop: 18,
                    },
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="camera" color={color} size={28}/>
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
                    headerShown: false,

                }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
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
const AddStack = ({ }) => {
    return (

        <Stack.Navigator>
            {/* <Stack.Screen
                name="NullScreen"
                component={NullScreen}
                
                options={{
                    headerShown: false,
                }}
            /> */}
            <Stack.Screen
                name="AddScreen"
                component={AddScreen}

                options={{
                    title: null,
                    headerShadowVisible: false,
                    paddingLeft: 50,
                    headerLeft: () => (
                        <Text size='2xl' color='black' style={{ paddingTop: 10, paddingLeft: 10 }}>新增日記</Text>
                    ),

                }}
            />

        </Stack.Navigator>
    );
}

export default Navigation;