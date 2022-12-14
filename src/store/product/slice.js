import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  product: null,
  searchResult: null
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload
    },
    updateProduct: (state, action) => {
      state.product = action.payload
    },
    updateSearchResult: (state, action) => {
      state.searchResult = action.payload
    },
  },
});

export const { updateProducts, updateProduct, updateSearchResult } = productSlice.actions;

export default productSlice.reducer;