import React, { useState, useEffect } from "./node_modules/react";
import Navigation from './src/navigation/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import * as Location from 'expo-location';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { UserLocation } from "./src/components/UserLocation";



export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    <UserLocation.Provider
      value={{ location, setLocation }}>
      <SafeAreaView style={{ flex: 1 }}>
        <GluestackUIProvider config={config}>
          <Navigation />
        </GluestackUIProvider>
      </SafeAreaView>
    </UserLocation.Provider>
  );
}
