import { createSlice } from "@reduxjs/toolkit";
import { CollectionsState } from "./types";
import { fetchCollections } from "./thunks";

const initialState: CollectionsState = {
  data: [],
  status: "idle",
  error: null,
};

const collectionsReducer = createSlice({
  name: "collections",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCollections.pending, state => {
        state.status = "pending";
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        (state.status = "rejected"),
          (state.error = action.error.message || "Unknown error occupied!");
      });
  },
});

export default collectionsReducer.reducer;
