import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { RootState } from "../../app/store";

type AlertType = "success" | "error" | "info";

interface Alert {
  id: string;
  message: string;
  type: AlertType;
  stale: boolean;
}

interface AlertState {
  current: Alert[];
}

const initialState: AlertState = {
  current: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (
      state,
      action: PayloadAction<{ type: AlertType; message: string }>
    ) => {
      const newAlert = {
        ...action.payload,
        id: Date.now().toString(),
        stale: false,
      };

      if (state.current.length > 0) {
        state.current[0].stale = true;
      }
      state.current.unshift(newAlert);
    },
    removeStaleAlerts: (state) => {
      state.current = state.current.filter((alert) => !alert.stale);
    },
    clearAlerts: (state) => {
      state.current = [];
    },
  },
});

export const { addAlert, removeStaleAlerts, clearAlerts } = alertSlice.actions;

// Thunk for adding an alert with animation
export const addAlertWithTimeout =
  (alert: { type: AlertType; message: string }): AppThunk =>
  (dispatch) => {
    // First dispatch the add action
    dispatch(addAlert(alert));

    // After animation completes, remove stale alerts
    setTimeout(() => {
      dispatch(removeStaleAlerts());
    }, 500);
  };

export const selectAlerts = (state: RootState) => state.alerts.current;

export default alertSlice.reducer;
