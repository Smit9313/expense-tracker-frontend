import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';

const initialState: any = [];

const expenseSlice = createSlice({
	name: "expense",
	initialState,
	reducers: {
		setExpense: (_state, {payload}) => payload,
	}
})

export const {setExpense} = expenseSlice.actions;

export default expenseSlice.reducer;

export const expenseSelector = createSelector(
	(state: RootState) => state,
	(state: RootState) => state.expense
)
