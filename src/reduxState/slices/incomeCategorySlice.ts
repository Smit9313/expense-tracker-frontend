import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../stores/store";

const initialState: any = [];

const incomeCategorySlice = createSlice({
  name: "incomeCategory",
  initialState,
  reducers: {
    setIncomeCategory: (_state, { payload }) => payload,
  },
});

export const {setIncomeCategory} = incomeCategorySlice.actions;

export default incomeCategorySlice.reducer;

export const incomeCategorySelector = createSelector(
	(state: RootState) => state,
	(state: RootState) => state.incomeCategory
)
