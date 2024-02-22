import { createSlice } from "@reduxjs/toolkit";
import { search } from "./thunks";
import { SearchState } from "./types";

const initialState: SearchState = {
  query: "",
  data: [],
  status: "idle",
  error: null,
};

const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
      if (action.payload.length < 3) {
        state.status = "idle";
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(search.pending, state => {
        state.status = "pending";
      })
      .addCase(search.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(search.rejected, (state, action) => {
        state.status = "rejected";
        state.error = (action.payload as string) || "Unknown error occupied";
      });
  },
});

export const { updateQuery } = searchReducer.actions;

export default searchReducer.reducer;
