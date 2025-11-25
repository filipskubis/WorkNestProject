import type { RootState } from "@/app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type User = {
  id: number;
  email: string;
};
export interface UserState {
  current: User | null;
}

const initialState: UserState = {
  current: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log("Payload: ", action.payload);
      state.current = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.current;
