import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth.js";
import { AuthPage } from "./features/auth/ui/AuthPage.jsx";
import { DashboardPage } from "./features/auth/ui/DashboardPage.jsx";

export default function App() {
  const { user, initializeSession } = useAuth();
  const sessionStarted = useRef(false);

  useEffect(() => {
    if (sessionStarted.current) return;
    sessionStarted.current = true;
    initializeSession();
  }, [initializeSession]);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <DashboardPage /> : <AuthPage />}
      />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
