import { RootState } from "@/redux/store";

export const selectModal = (state: RootState) => state.modal.current;
