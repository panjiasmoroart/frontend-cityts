//import react router dom
import { Routes, Route, Navigate } from "react-router";

//import useAuthStore
import { useAuthStore } from "../stores/auth";

//import view login
import Login from "../views/auth/login";
import Dashboard from "../views/admin/dashboard";

export default function AppRoutes() {
  // Ambil state isAuthenticated dari useAuthStore
  const isAuthenticated = useAuthStore((state) => state.token !== "");

  return (
    <Routes>
      {/* route "/login" */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* route "/admin/dashboard" */}
      <Route
        path="/admin/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}
