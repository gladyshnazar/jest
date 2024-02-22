import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalState, ModalType } from "./types";

const initialState: ModalState = {
  current: null,
};

export const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalType>) => {
      state.current = action.payload;
    },
  },
});

export const { setModal } = modalReducer.actions;
export default modalReducer.reducer;
