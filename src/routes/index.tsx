//import react router dom
import { Routes, Route, Navigate } from "react-router";

//import useAuthStore
import { useAuthStore } from "../stores/auth";

//import all view
import Login from "../views/auth/login";
import Dashboard from "../views/admin/dashboard";
import Forbidden from "../views/admin/forbidden";
import Permissions from "../views/admin/permissions";
import PermissionCreate from "../views/admin/permissions/create";
import PermissionEdit from "../views/admin/permissions/edit";
import Roles from "../views/admin/roles";
import RoleCreate from "../views/admin/roles/create";
import RoleEdit from "../views/admin/roles/edit";
import Users from "../views/admin/users";
import UserCreate from "../views/admin/users/create";
import UserEdit from "../views/admin/users/edit";
import Categories from "../views/admin/categories";
import CategoryCreate from "../views/admin/categories/create";
import CategoryEdit from "../views/admin/categories/edit";
import Posts from "../views/admin/posts";
import PostCreate from "../views/admin/posts/create";
import PostEdit from "../views/admin/posts/edit";
import Pages from "../views/admin/pages";
import PageCreate from "../views/admin/pages/create";
import PageEdit from "../views/admin/pages/edit";
import Products from "../views/admin/products";
import ProductCreate from "../views/admin/products/create";
import ProductEdit from "../views/admin/products/edit";
import Photos from "../views/admin/photos";
import Sliders from "../views/admin/sliders/index";
import Aparaturs from "../views/admin/aparaturs";
import AparaturCreate from "../views/admin/aparaturs/create";
import AparaturEdit from "../views/admin/aparaturs/edit";

//=======================================================

//import view home
import Home from "../views/web/home/index";

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

      {/* route "/admin/permissions" */}
      <Route
        path="/admin/permissions"
        element={
          isAuthenticated ? <Permissions /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/permissions/create" */}
      <Route
        path="/admin/permissions/create"
        element={
          isAuthenticated ? (
            <PermissionCreate />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* route "/admin/permissions/edit/:id" */}
      <Route
        path="/admin/permissions/edit/:id"
        element={
          isAuthenticated ? (
            <PermissionEdit />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* route "/admin/roles" */}
      <Route
        path="/admin/roles"
        element={isAuthenticated ? <Roles /> : <Navigate to="/login" replace />}
      />

      {/* route "/admin/roles/create" */}
      <Route
        path="/admin/roles/create"
        element={
          isAuthenticated ? <RoleCreate /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/roles/edit/:id" */}
      <Route
        path="/admin/roles/edit/:id"
        element={
          isAuthenticated ? <RoleEdit /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/users" */}
      <Route
        path="/admin/users"
        element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />}
      />

      {/* route "/admin/users/create" */}
      <Route
        path="/admin/users/create"
        element={
          isAuthenticated ? <UserCreate /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/users/edit/:id" */}
      <Route
        path="/admin/users/edit/:id"
        element={
          isAuthenticated ? <UserEdit /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/categories" */}
      <Route
        path="/admin/categories"
        element={
          isAuthenticated ? <Categories /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/categories/create" */}
      <Route
        path="/admin/categories/create"
        element={
          isAuthenticated ? (
            <CategoryCreate />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* route "/admin/categories/edit/:id" */}
      <Route
        path="/admin/categories/edit/:id"
        element={
          isAuthenticated ? <CategoryEdit /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/posts" */}
      <Route
        path="/admin/posts"
        element={isAuthenticated ? <Posts /> : <Navigate to="/login" replace />}
      />

      {/* route "/admin/posts/create" */}
      <Route
        path="/admin/posts/create"
        element={
          isAuthenticated ? <PostCreate /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/posts/edit/:id" */}
      <Route
        path="/admin/posts/edit/:id"
        element={
          isAuthenticated ? <PostEdit /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/pages" */}
      <Route
        path="/admin/pages"
        element={isAuthenticated ? <Pages /> : <Navigate to="/login" replace />}
      />

      {/* route "/admin/pages/create" */}
      <Route
        path="/admin/pages/create"
        element={
          isAuthenticated ? <PageCreate /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/pages/edit/:id" */}
      <Route
        path="/admin/pages/edit/:id"
        element={
          isAuthenticated ? <PageEdit /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/products" */}
      <Route
        path="/admin/products"
        element={
          isAuthenticated ? <Products /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/products/create" */}
      <Route
        path="/admin/products/create"
        element={
          isAuthenticated ? <ProductCreate /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/products/edit/:id" */}
      <Route
        path="/admin/products/edit/:id"
        element={
          isAuthenticated ? <ProductEdit /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/photos" */}
      <Route
        path="/admin/photos"
        element={
          isAuthenticated ? <Photos /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/sliders" */}
      <Route
        path="/admin/sliders"
        element={
          isAuthenticated ? <Sliders /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/aparaturs" */}
      <Route
        path="/admin/aparaturs"
        element={
          isAuthenticated ? <Aparaturs /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/admin/aparaturs/create" */}
      <Route
        path="/admin/aparaturs/create"
        element={
          isAuthenticated ? (
            <AparaturCreate />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* route "/admin/aparaturs/edit/:id" */}
      <Route
        path="/admin/aparaturs/edit/:id"
        element={
          isAuthenticated ? <AparaturEdit /> : <Navigate to="/login" replace />
        }
      />

      {/* route "/" */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
