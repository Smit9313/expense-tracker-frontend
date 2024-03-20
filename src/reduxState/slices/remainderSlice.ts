import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";

const initialState: any = [];

const remainderSlice = createSlice({
  name: "remainder",
  initialState,
  reducers: {
    setRemainder: (_state, { payload }) => payload,
  },
});

export const { setRemainder } = remainderSlice.actions;

export default remainderSlice.reducer;

export const remainderSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.remainder
);
