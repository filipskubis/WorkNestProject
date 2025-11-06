// This file demonstrates typical usage of Redux Toolkit's createSlice function
// for defining reducer logic and actions, as well as related thunks and selectors.

import type { AppThunk, RootState } from "@/app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Tab = "tasks" | "projects" | "team";
export interface TabState {
  current: Tab;
}

const initialState: TabState = {
  current: "tasks",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    swap: (state, action: PayloadAction<Tab>) => {
      state.current = action.payload;
    },
  },
});

export const { swap } = tabSlice.actions;

export default tabSlice.reducer;

export const selectTab = (state: RootState) => state.tab.current;
