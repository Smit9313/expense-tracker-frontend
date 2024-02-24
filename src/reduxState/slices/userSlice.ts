import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from '../stores/store';

const initialState: any = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, { payload }) => payload,
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;

export const userSelector = createSelector(
	(state: RootState) => state,
	(state: RootState) => state.user
)
