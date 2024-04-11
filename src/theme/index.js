import { DefaultTheme } from '@react-navigation/native';

const MyTheme = {
   ...DefaultTheme,
   colors: {
     ...DefaultTheme.colors,
     darkGray:'#696969',
     lightGray:'#EAEAEA',
     darkGreen:'#466A47',
     lightGreen:'#85B387',
     white:'#fff',
     black:'#131313'
   },
 };

 export default MyTheme;