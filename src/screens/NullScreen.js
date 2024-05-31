import React, { useEffect } from 'react';
import { HStack, Box, Text, Pressable, VStack, Center, Menu, MenuItem, Icon, MenuIcon, MenuItemLabel, Button, ButtonText } from "@gluestack-ui/themed";
import { data, region } from "../components/Data"
const NullScreen = ({ navigation }) => {


   useEffect(() => {
      navigation.navigate('AddScreen');
   }, [])

   return (
    <>
    </>
    //   <Center
    //   >
    //     {data.map((testItem, testIndex) => (

           
    //             <Pressable
                    
    //                 onPress={() => {
    //                     navigation.navigate('AddScreen', { item: testItem });
    //                 }}
    //             >
    //            <Text>alskdjhfaslkdfhj</Text>
    //             </Pressable>
               
    //     ))}
   
    // </Center>

   );
};


export default NullScreen;