import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCollections = createAsyncThunk(
  "collections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.collections);
      return response.data;
    } catch (err: any) {
      rejectWithValue(err.response.data.error);
    }
  }
);
