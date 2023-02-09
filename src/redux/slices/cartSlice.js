import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    items: [],
  },
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    removeProduct(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearProduct(state) {
      state.items = [];
    },
  },
});

export const { addProduct, removeProduct, clearProduct } = cartSlice.actions;
