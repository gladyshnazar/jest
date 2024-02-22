import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState, UserType } from "./types";
import { fetchUser } from "./thunks";

const initialState: UserState = {
  data: null,
  status: "idle",
  error: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    poppulateUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = "pending";
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.status = "fulfilled";
          state.data = action.payload;
        }
      );
  },
});

export const { poppulateUser, clearUser } = userReducer.actions;

export default userReducer.reducer;
