// Import React
import React from "react";

// Import ikon menu dari react-icons
import {
  FiHome,
  FiInfo,
  FiUsers,
  FiBookOpen,
  FiShoppingBag,
  FiImage,
  FiX,
} from "react-icons/fi";

// Import store untuk manajemen state tema
import { useThemeStore } from "../../../stores/theme";

// Daftar link menu
const navLinks = [
  { path: "/", label: "Beranda", icon: FiHome },
  { path: "/pages", label: "Tentang Desa", icon: FiInfo },
  { path: "/aparaturs", label: "Aparaturs", icon: FiUsers },
  { path: "/posts", label: "Berita", icon: FiBookOpen },
  { path: "/products", label: "Produk Desa", icon: FiShoppingBag },
  { path: "/photos", label: "Galeri", icon: FiImage },
];

const MenuMobile: React.FC = () => {
  // Ambil status drawer dan fungsi untuk membuka dan menutup drawer
  const { isDrawerOpen, toggleDrawer } = useThemeStore();

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out md:hidden`}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={toggleDrawer}
      ></div>
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm shadow-xl bg-linear-to-br from-yellow-600 via-yellow-700 to-yellow-800 border-l border-yellow-500 rounded-l-2xl">
        <div className="flex justify-between items-center p-4 border-b border-yellow-600">
          <h3 className="text-xl font-bold text-white">Menu</h3>
          <button
            onClick={toggleDrawer}
            className="text-white hover:text-yellow-300 p-2"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto h-full p-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <a
                key={path}
                href={path}
                onClick={toggleDrawer}
                className="flex items-center gap-3 text-white text-lg font-medium hover:bg-yellow-800 px-4 py-3 rounded-2xl transition-colors"
              >
                <Icon className="h-5 w-5" />
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
