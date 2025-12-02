import type { RootState } from "@/app/store";
import fetcher from "@/utils/fetcher";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Types
export type User = {
  id: number;
  email: string;
  name: string;
};

export interface UserState {
  current: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  current: null,
  isLoading: true,
  error: null,
};

// Thunk for checking authentication status
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetcher({ address: "/auth/me" });
      const { user } = data;

      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.current = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

// Actions
export const { setUser, setLoading, setError, logout } = userSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.current;
export const selectIsLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
