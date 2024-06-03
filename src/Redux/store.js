import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};


// export default configureStore({
//   reducer: {
//     cart: cartReducer
//   }
// })

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

persistStore(store);