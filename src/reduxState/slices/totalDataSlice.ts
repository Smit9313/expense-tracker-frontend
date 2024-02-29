import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";

const initialState: any = [];

const totalDataSlice = createSlice({
  name: "totalData",
  initialState,
  reducers: {
    setIncome: (_state, { payload }) => payload,
  },
});

export const { setIncome } = totalDataSlice.actions;

export default totalDataSlice.reducer;

export const totalDataSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.totalData
);
