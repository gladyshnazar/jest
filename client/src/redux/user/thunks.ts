import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  endpoints.user.fetch,
  async (_, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(err.response.data.error);
    }
  }
);
