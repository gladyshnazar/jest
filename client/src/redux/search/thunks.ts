import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const search = createAsyncThunk(
  "search",
  async (query: string, { rejectWithValue }) => {
    if (!query || query.length < 2) {
      return rejectWithValue("Query length must be at least 2 characters");
    }
    try {
      const response = await axios.get(endpoints.search(query));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
