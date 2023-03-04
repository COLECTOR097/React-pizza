import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Pizza = {
  id: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
};

export type SearchParams = {
  sortBy: string;
  order: string;
  search: string;
  category: string;
  currentPage: string;
};
interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};
export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params: Record<string, string>) => {
    const { sortBy, order, search, category, currentPage } = params;
    const response = await axios.get(
      `https://63da2e8c2af48a60a7c709ce.mockapi.io/items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`
    );
    return response.data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = "loading";
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = "error";
    });
  },
});
