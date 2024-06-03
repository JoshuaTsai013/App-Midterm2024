import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id == action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    addToFavorite: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id == action.payload.id);
      if (!itemInCart) {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromFavorite: (state, action) => {
      const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = removeFromCart;
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = removeFromCart;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id == action.payload.id);
      itemInCart.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id == action.payload.id);
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
    },
    toggleColorMode: (state) => {
      state.colorMode=state.colorMode==='light'?'dark':'light';
    },
  }
});


export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity ,addToFavorite,removeFromFavorite,toggleColorMode} = cartSlice.actions;
export const selectColorMode = (state) =>state.cart.colorMode;

export default cartSlice.reducer;