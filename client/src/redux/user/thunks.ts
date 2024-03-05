import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  endpoints.user.fetch,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        endpoints.user.fetch,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);
