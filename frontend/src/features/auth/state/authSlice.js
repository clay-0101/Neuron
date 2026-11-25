import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = "idle";
      state.error = null;
    },
    setAuthStatus(state, action) {
      state.status = action.payload;
    },
    setAuthError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    clearCredentials(state) {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
      if (state.status === "failed") state.status = "idle";
    },
  },
});

export const { setCredentials, setAuthStatus, setAuthError, clearCredentials, clearAuthError } =
  authSlice.actions;
export default authSlice.reducer;
