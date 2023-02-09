import { configureStore } from "@reduxjs/toolkit";

import { filterSlice, cartSlice } from "./slices";

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
  },
});
