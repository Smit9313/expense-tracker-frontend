import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';

const initialState: any = [];

const expenseCategorySlice = createSlice({
	name: "expenseCategory",
	initialState,
	reducers: {
		setExpenseCategory: (_state, {payload}) => payload,
	}
})

export const {setExpenseCategory} = expenseCategorySlice.actions;

export default expenseCategorySlice.reducer;

export const expenseCategorySelector = createSelector(
	(state: RootState) => state,
	(state: RootState) => state.expenseCategory
)