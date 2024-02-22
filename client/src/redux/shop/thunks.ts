import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsByCategorySlug = createAsyncThunk(
  "products/byCategory",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.shop.category(slug));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "products/individual",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.shop.product(slug));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/featured",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.shop.featured);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const fetchDiscountedProducts = createAsyncThunk(
  "products/discounted",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.shop.discounted);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.shop.all);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);
