import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import { createStore, combineReducers, applyMiddleware } from 'redux'


export default configureStore({
  reducer: {
    cart: cartReducer
  }
})