// Import React dan hook useState
import React, { useState } from "react";

// Import ikon menu dari react-icons
import {
  FiHome,
  FiFolder,
  FiImage,
  FiUsers,
  FiUserCheck,
  FiEdit,
  FiChevronDown,
  FiChevronRight,
  FiFileText,
  FiFile,
  FiShoppingBag,
  FiCamera,
  FiShield,
  FiKey,
} from "react-icons/fi";

// Import store untuk manajemen state tema
import { useThemeStore } from "../../../stores/theme";

// Import hook useLocation untuk mendapatkan path aktif
import { useLocation, Link } from "react-router";

// Import utilitas untuk mengecek permission
import hasAnyPermission from "../../../utils/permissions";

const SidebarMenu: React.FC = () => {
  // Ambil state sidebarOpen dari theme store
  const { sidebarOpen } = useThemeStore();

  // Ambil lokasi saat ini dari useLocation
  const location = useLocation();

  // State untuk menyimpan status menu yang terbuka
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    contentsManagement: false,
    media: false,
    usersManagement: false,
  });

  // Fungsi untuk toggle status menu
  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Cek apakah path aktif termasuk dalam menu tertentu
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Cek apakah salah satu submenu aktif
  const shouldMenuOpen = (parentPath: string, subPaths: string[]) => {
    return subPaths.some((path) => isActive(path)) || openMenus[parentPath];
  };

  return (
    <nav className="p-4 overflow-y-auto h-[calc(100vh-65px)]">
      <ul className="space-y-1">
        {/* Dashboard */}
        <li>
          <Link
            to="/admin/dashboard"
            className={`flex items-center p-3 rounded-lg ${
              isActive("/admin/dashboard")
                ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                : "hover:bg-gray-100 rounded-xl text-gray-700"
            }`}
          >
            <FiHome className="text-lg" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Link>
        </li>

        {/* Contents Management */}
        {(hasAnyPermission(["categories-index"]) ||
          hasAnyPermission(["posts-index"]) ||
          hasAnyPermission(["pages-index"]) ||
          hasAnyPermission(["products-index"])) && (
          <li>
            <button
              onClick={() => toggleMenu("contentsManagement")}
              className={`w-full flex items-center justify-between p-3 rounded-lg ${
                isActive("/contents")
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-100 rounded-xl"
              } text-gray-700`}
            >
              <div className="flex items-center">
                <FiEdit className="text-lg" />
                {sidebarOpen && (
                  <span className="ml-3">Contents Management</span>
                )}
              </div>
              {sidebarOpen &&
                (shouldMenuOpen("contentsManagement", [
                  "/admin/categories",
                  "/admin/posts",
                  "/admin/pages",
                  "/admin/products",
                ]) ? (
                  <FiChevronDown className="ml-2" />
                ) : (
                  <FiChevronRight className="ml-2" />
                ))}
            </button>

            {shouldMenuOpen("contentsManagement", [
              "/admin/categories",
              "/admin/posts",
              "/admin/pages",
              "/admin/products",
            ]) &&
              sidebarOpen && (
                <ul className="ml-5 mt-1 space-y-1">
                  {hasAnyPermission(["categories-index"]) && (
                    <li>
                      <Link
                        to="/admin/categories"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/categories")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100 rounded-xl"
                        } text-gray-700 text-sm`}
                      >
                        <FiFolder className="text-sm" />
                        <span className="ml-3">Categories</span>
                      </Link>
                    </li>
                  )}

                  {hasAnyPermission(["posts-index"]) && (
                    <li>
                      <Link
                        to="/admin/posts"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/posts")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100 rounded-xl"
                        } text-gray-700 text-sm`}
                      >
                        <FiFileText className="text-sm" />
                        <span className="ml-3">Posts</span>
                      </Link>
                    </li>
                  )}

                  {hasAnyPermission(["pages-index"]) && (
                    <li>
                      <Link
                        to="/admin/pages"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/pages")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100 rounded-xl"
                        } text-gray-700 text-sm`}
                      >
                        <FiFile className="text-sm" />
                        <span className="ml-3">Pages</span>
                      </Link>
                    </li>
                  )}

                  {hasAnyPermission(["products-index"]) && (
                    <li>
                      <Link
                        to="/admin/products"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/products")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100 rounded-xl"
                        } text-gray-700 text-sm`}
                      >
                        <FiShoppingBag className="text-sm" />
                        <span className="ml-3">Products</span>
                      </Link>
                    </li>
                  )}
                </ul>
              )}
          </li>
        )}

        {/* Media */}
        {(hasAnyPermission(["photos-index"]) ||
          hasAnyPermission(["sliders-index"])) && (
          <li>
            <button
              onClick={() => toggleMenu("media")}
              className={`w-full flex items-center justify-between p-3 rounded-lg ${
                isActive("/media")
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-100 rounded-xl"
              } text-gray-700`}
            >
              <div className="flex items-center">
                <FiImage className="text-lg" />
                {sidebarOpen && <span className="ml-3">Media</span>}
              </div>
              {sidebarOpen &&
                (shouldMenuOpen("media", [
                  "/admin/photos",
                  "/admin/sliders",
                ]) ? (
                  <FiChevronDown className="ml-2" />
                ) : (
                  <FiChevronRight className="ml-2" />
                ))}
            </button>

            {shouldMenuOpen("media", ["/admin/photos", "/admin/sliders"]) &&
              sidebarOpen && (
                <ul className="ml-5 mt-1 space-y-1">
                  {hasAnyPermission(["photos-index"]) && (
                    <li>
                      <Link
                        to="/admin/photos"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/photos")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100 rounded-xl"
                        } text-gray-700 text-sm`}
                      >
                        <FiCamera className="text-sm" />
                        <span className="ml-3">Photos</span>
                      </Link>
                    </li>
                  )}

                  {hasAnyPermission(["sliders-index"]) && (
                    <li>
                      <Link
                        to="/admin/sliders"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/sliders")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100 rounded-xl"
                        } text-gray-700 text-sm`}
                      >
                        <FiImage className="text-sm" />
                        <span className="ml-3">Sliders</span>
                      </Link>
                    </li>
                  )}
                </ul>
              )}
          </li>
        )}

        {/* Aparaturs */}
        {hasAnyPermission(["aparaturs-index"]) && (
          <li>
            <Link
              to="/admin/aparaturs"
              className={`flex items-center p-3 rounded-lg ${
                isActive("/admin/aparaturs")
                  ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                  : "hover:bg-gray-100 rounded-xl text-gray-700"
              }`}
            >
              <FiUserCheck className="text-lg" />
              {sidebarOpen && <span className="ml-3">Aparaturs</span>}
            </Link>
          </li>
        )}

        {/* Users Management */}
        {(hasAnyPermission(["roles-index"]) ||
          hasAnyPermission(["permissions-index"]) ||
          hasAnyPermission(["users-index"])) && (
          <li>
            <button
              onClick={() => toggleMenu("usersManagement")}
              className={`w-full flex items-center justify-between p-3 rounded-lg ${
                isActive("/users")
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-100 rounded-xl"
              } text-gray-700`}
            >
              <div className="flex items-center">
                <FiUsers className="text-lg" />
                {sidebarOpen && <span className="ml-3">Users Management</span>}
              </div>
              {sidebarOpen &&
                (shouldMenuOpen("usersManagement", [
                  "/admin/roles",
                  "/admin/permissions",
                  "/admin/users",
                ]) ? (
                  <FiChevronDown className="ml-2" />
                ) : (
                  <FiChevronRight className="ml-2" />
                ))}
            </button>

            {shouldMenuOpen("usersManagement", [
              "/admin/roles",
              "/admin/permissions",
              "/admin/users",
            ]) &&
              sidebarOpen && (
                <ul className="ml-5 mt-1 space-y-1">
                  {hasAnyPermission(["roles-index"]) && (
                    <li>
                      <Link
                        to="/admin/roles"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/roles")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100 rounded-xl"
                        } text-gray-700 text-sm`}
                      >
                        <FiShield className="text-sm" />
                        <span className="ml-3">Roles</span>
                      </Link>
                    </li>
                  )}

                  {hasAnyPermission(["permissions-index"]) && (
                    <li>
                      <Link
                        to="/admin/permissions"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/permissions")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100"
                        } text-gray-700 text-sm`}
                      >
                        <FiKey className="text-sm" />
                        <span className="ml-3">Permissions</span>
                      </Link>
                    </li>
                  )}

                  {hasAnyPermission(["users-index"]) && (
                    <li>
                      <Link
                        to="/admin/users"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive("/admin/users")
                            ? "bg-linear-to-r from-yellow-100 to-white text-yellow-700 font-medium rounded-xl border-l-4 border-yellow-400"
                            : "hover:bg-gray-100 rounded-xl"
                        } text-gray-700 text-sm`}
                      >
                        <FiUsers className="text-sm" />
                        <span className="ml-3">Users</span>
                      </Link>
                    </li>
                  )}
                </ul>
              )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SidebarMenu;
