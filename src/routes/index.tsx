//import react router dom
import { Routes, Route, Navigate } from "react-router";

//import useAuthStore
import { useAuthStore } from "../stores/auth";

//import view login
import Login from "../views/auth/login";
//import view Dashboard
import Dashboard from "../views/admin/dashboard";
//import view Forbidden
import Forbidden from "../views/admin/forbidden";

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

      {/* route "/admin/forbidden" */}
      <Route
        path="/admin/forbidden"
        element={
          isAuthenticated ? <Forbidden /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}
