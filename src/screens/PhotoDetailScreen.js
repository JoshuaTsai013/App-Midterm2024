import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { HStack, Center, Box, Text, Pressable } from "@gluestack-ui/themed";
import { View, StyleSheet, Image,Animated, ScrollView, Dimensions, Platform, useWindowDimensions } from 'react-native';
import MyTheme from '../theme';
import { FadeInLeft } from 'react-native-reanimated';
import ActionSheet from 'react-native-actionsheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import images from '../../assets/image'; 


export default function PhotoDetailScreen({ navigation, route }) {
   const { colors } = useTheme();
   const { item } = route.params;
   const { width } = useWindowDimensions();
   const toggleFunction = () => {
      setToggle(!toggle);
   };
   let actionSheet = useRef();
   let optionArray = [
      'Delete', 'Add', 'Cancel'
   ]
   const showActionSheet = () => {
      actionSheet.current.show();
   }
   scale = new Animated.Value(1);

   onZoomEventFunction=Animated.event(
      [{
         nativeEvent:{scale:this.scale}
      }],
      {
         useNativeDriver:true
      }
   )

   onZoomStateChangeFunction=(event)=>{
      if(event.nativeEvent.oldState == State.ACTIVE){
         Animated.spring(this.scale,{
            toValue:1,
            useNativeDriver:true
         }).start()
      }
   }

   return (
      <Box w={width} bgColor={colors.white} style={styles.container}>
         {/* <Pressable position='absolute' top={70} right={30} onPress={showActionSheet}>
            <Image
               source={require('../../image/actionButton.png')}
               style={styles.actionButton} />
         </Pressable> */}
         <Pressable position='absolute' top={70} left={30} onPress={() => { navigation.goBack(); }}>
            <MaterialIcons name='arrow-back-ios-new' color={colors.darkGreen} size={22} />
         </Pressable>
         <PinchGestureHandler
         onGestureEvent={this.onZoomEventFunction}
         onHandlerStateChange={this.onZoomStateChangeFunction}>
            <Animated.Image source={images[item.image]} style={{width:'100%',height:'50%',transform:[{scale:this.scale}]}} />

         </PinchGestureHandler>
         {/* <Animated.Text style={styles.text} entering={FadeInLeft.duration(700)}>
            {item.note}
         </Animated.Text>
         <ActionSheet
            ref={actionSheet}
            title='which do you want'
            options={optionArray}
            cancelButtonIndex={2}
            destructiveButtonIndex={0}
            onPress={(index) => (
               index === 0 ? alert(optionArray[index]) : null
            )}
         /> */}
      </Box >
   )
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
   },
   image: {
      width: '100%',
      height: '100%',
      maxHeight: 650,
      resizeMode: 'contain',
      marginBottom: 40,
      marginTop: 40
   },
   actionButton: {
      width: 23,
      height: 23
   }
})

