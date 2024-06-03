import React from 'react';
import { Center, Switch, HStack, Text } from '@gluestack-ui/themed';
import { View, FlatList, StyleSheet, Image, ScrollView,Dimensions, Platform, useWindowDimensions } from 'react-native';
import { useSelector } from "react-redux";
import images from '../../assets/image'; 

const SettingScreen = () => {
   const cart = useSelector((state) => state.cart.cart);

   return (
      <Center
         shadow={2} width="90%"
         mt="$2" px="$2" py="$4"
         bg="white" borderRadius={3}
         alignSelf="center"
      >
         <HStack space={8} alignItems="center" >
            <Text size="lg" px="$2">Light Mode</Text>
            <Switch
               name="light Mode"
               size='md'
               accessibilityLabel="display-mode"
               accessibilityHint="light or dark mode"
            />
         </HStack>
         {cart.map((item, index) => (
            <View style={{ padding: 10 }} key={item.id}>
               <Text>{item.title}</Text>
               <Image style={{ width: 100, height: 100, borderRadius: 8, marginTop: 6 }}
                  source={images[item.image]} />
            </View>
         ))}
      </Center>
   );
};

export default SettingScreen;
