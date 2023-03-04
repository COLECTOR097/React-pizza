import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { useDispatch } from "react-redux";

import { filterSlice, cartSlice, pizzaSlice } from "./slices";
export const store: ToolkitStore = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
    pizza: pizzaSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
