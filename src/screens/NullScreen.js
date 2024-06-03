import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const NullScreen = ({ navigation }) => {
   useFocusEffect(
      React.useCallback(() => {
         navigation.navigate('AddScreen');
        // Code to run when the screen is focused (entered)
        //console.log('Screen focused!');
  
        // Optional cleanup function when screen loses focus
        return () => {
          //console.log('Screen blurred!');
        };
      }, []) // Empty dependency array ensures this runs only once on mount
    );
  
    // ... rest of your screen component
  

   // useEffect(() => {
   //    navigation.navigate('AddScreen');
   // }, [])

   return (
    <>
    </>
    

   );
};


export default NullScreen;