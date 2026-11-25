import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiErrorMessage,
  loginRequest,
  logoutRequest,
  meRequest,
  refreshRequest,
  registerRequest,
} from "../api/authApi.js";
import {
  clearAuthError,
  clearCredentials,
  setAuthError,
  setAuthStatus,
  setCredentials,
} from "../state/authSlice.js";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const authenticate = useCallback(async (request, values) => {
    dispatch(clearAuthError());
    dispatch(setAuthStatus("loading"));
    try {
      dispatch(setCredentials(await request(values)));
    } catch (error) {
      dispatch(setAuthError(getApiErrorMessage(error)));
    }
  }, [dispatch]);

  const login = useCallback((values) => authenticate(loginRequest, values), [authenticate]);
  const register = useCallback((values) => authenticate(registerRequest, values), [authenticate]);

  const initializeSession = useCallback(async () => {
    dispatch(setAuthStatus("loading"));
    try {
      const { accessToken } = await refreshRequest();
      const { user } = await meRequest(accessToken);
      dispatch(setCredentials({ user, accessToken }));
    } catch {
      dispatch(clearCredentials());
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      dispatch(clearCredentials());
    }
  }, [dispatch]);

  const dismissError = useCallback(() => dispatch(clearAuthError()), [dispatch]);

  return { ...auth, login, register, logout, initializeSession, dismissError };
}
