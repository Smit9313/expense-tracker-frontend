import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";

const initialState: any = [];

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    setIncome: (_state, { payload }) => payload,
  },
});

export const { setIncome } = incomeSlice.actions;

export default incomeSlice.reducer;

export const incomeSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.income
);
