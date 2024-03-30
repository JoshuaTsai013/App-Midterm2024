import React, { useState } from 'react';
import { NavigationContainer, useTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider, Center, Image, Box, Text, Pressable } from '@gluestack-ui/themed';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import WishListScreen from '../screens/WishListScreen';
import MyBookScreen from '../screens/MyBookScreen'
import SettingScreen from '../screens/SettingScreen';
import AccountScreen from '../screens/AccountScreen'
import MyTheme from '../theme';

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
                    <Image
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
                          >May</Text>
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
                drawerActiveBackgroundColor:colors.purple,
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
                name="Account"
                component={AccountStack}
                options={{
                    headerShown: false,
                    drawerLabel: "Account",
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
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
                tabBarActiveTintColor:colors.purple,
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="wishlist"
                component={WishListScreen}
                options={{
                    title: "Wishlist",
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontSize: 20
                    },
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bookmark" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="MyBook"
                component={MyBookScreen}
                options={{
                    title: "My Books",
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontSize: 20
                    },
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book-open" color={color} size={26} />
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
            <Stack.Screen
                name="DisplaySetting"
                component={SettingScreen}
                options={{
                    title: "Display",
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontSize: 20
                    },
                }}
            />
        </Stack.Navigator>
    );
}
const HomeStack = ({ navigation }) => {
    const [toggle, setToggle] = useState(true);
    const toggleFunction = () => {
        setToggle(!toggle);
    };
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
                    title: null,
                    headerShadowVisible: false,
                    headerTintColor: '#131313',
                    headerRight: () => (
                        <Pressable onPress={() => toggleFunction()}>
                            {toggle ? 
                            <MaterialCommunityIcons name='bookmark-outline' color='#131313' size={26} /> :
                            <MaterialCommunityIcons name='bookmark' color='#6200EE' size={26} />}
                        </Pressable>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
const AccountStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AccountScreen"
                component={AccountScreen}
                options={{
                    title: "Account",
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

export default Navigation;