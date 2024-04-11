import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { HStack, Center, Box, Text, Pressable } from "@gluestack-ui/themed";
import { View, StyleSheet, Image, ScrollView, Animated, Dimensions, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen({ navigation, route }) {
   const { item } = route.params;
   return (
      <SafeAreaView style={{ flex: 1}}>
         <Box style={[StyleSheet.absoluteFillObject]}>
            <Image 
               source={item.image} 
               style={[
                  StyleSheet.absoluteFillObject,
                  {
                     resizeMode:'cover'
                  }
               ]} />
         </Box>


      </SafeAreaView>
   )
}
const styles = StyleSheet.create({
   image: {
       width: '100%',
       height: 300,

   },
})