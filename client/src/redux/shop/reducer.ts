import { createSlice } from "@reduxjs/toolkit";
import { ErrorType } from "@/redux/types";

import {
  fetchAllProducts,
  fetchDiscountedProducts,
  fetchFeaturedProducts,
  fetchProductBySlug,
  fetchProductsByCategorySlug,
} from "./thunks";

import { ProductsStateType } from "./types";

const initialState: ProductsStateType = {
  individual: {
    data: null,
    status: "idle",
    error: null,
  },
  byCategory: {
    data: [],
    status: "idle",
    error: null,
  },
  featured: {
    data: [],
    status: "idle",
    error: null,
  },
  discounted: {
    data: [],
    status: "idle",
    error: null,
  },
  all: {
    data: [],
    status: "idle",
    error: null,
  },
};

const shopReducer = createSlice({
  name: "shop",
  initialState,
  reducers: {
    clearIndividualProductData: state => {
      state.individual.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFeaturedProducts.pending, state => {
        state.featured.status = "pending";
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featured.status = "fulfilled";
        state.featured.data = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.featured.status = "rejected";
        state.featured.error =
          action.error.message || "Unknown error occurred!";
      })
      .addCase(fetchDiscountedProducts.pending, state => {
        state.discounted.status = "pending";
      })
      .addCase(fetchDiscountedProducts.fulfilled, (state, action) => {
        state.discounted.status = "fulfilled";
        state.discounted.data = action.payload; // Corrected from state.featured.data
      })
      .addCase(fetchDiscountedProducts.rejected, (state, action) => {
        state.discounted.status = "rejected";
        state.discounted.error =
          action.error.message || "Unknown error occurred!";
      })
      .addCase(fetchProductsByCategorySlug.pending, state => {
        state.byCategory.status = "pending";
      })
      .addCase(fetchProductsByCategorySlug.fulfilled, (state, action) => {
        state.byCategory.status = "fulfilled";
        state.byCategory.data = action.payload;
      })
      .addCase(fetchProductsByCategorySlug.rejected, (state, action) => {
        state.byCategory.status = "rejected";
        state.byCategory.error = action.payload as ErrorType;
      })
      .addCase(fetchProductBySlug.pending, state => {
        state.individual.status = "pending";
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.individual.status = "fulfilled";
        state.individual.error = null;
        state.individual.data = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.individual.status = "rejected";
        state.individual.error = action.payload as ErrorType;
      })
      .addCase(fetchAllProducts.pending, state => {
        state.all.status = "pending";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.all.status = "fulfilled";
        state.all.error = null;
        state.all.data = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.all.status = "rejected";
        state.all.error = action.payload as ErrorType;
      });
  },
});

export const { clearIndividualProductData } = shopReducer.actions;

export default shopReducer.reducer;
