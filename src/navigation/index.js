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
import { useFonts } from 'expo-font'

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
                            <Ionicons position='absolute' zIndex={10} bottom={-10} left={-35} name="add-circle-sharp" color={colors.darkGreen} size={70} style={{ marginTop: -55 }} />
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
                        <Ionicons name="map" color={color} size={26}/>
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
const AddStack = ({}) => {
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
                    paddingLeft:50,
                    headerLeft: () => (
                        <Text size='2xl' color='black' style={{ paddingTop: 10 ,paddingLeft: 10}}>新增日記</Text>
                    ),
                    
                }}
            />
            
        </Stack.Navigator>
    );
}

export default Navigation;