import React, { useState, useEffect } from "./node_modules/react";
import Navigation from './src/navigation/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import * as Location from 'expo-location';
// import { Platform, Text, View, StyleSheet } from 'react-native';
import { useColorScheme } from "react-native";
import { UserLocation } from "./src/components/UserLocation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import {store} from "./src/Redux/store";



export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      console.log(location)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserLocation.Provider
        value={{ location, setLocation }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <GluestackUIProvider config={config} colorMode={colorScheme}>
              <Navigation />
            </GluestackUIProvider>
          </Provider>
        </SafeAreaView>
      </UserLocation.Provider>
    </GestureHandlerRootView>
  );
}
