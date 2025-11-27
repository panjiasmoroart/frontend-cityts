//import react router dom
import { Routes, Route, Navigate } from "react-router";

//import useAuthStore
import { useAuthStore } from "../stores/auth";

//import view login
import Login from "../views/auth/login";

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
    </Routes>
  );
}
