// Import React
import React from "react";

// Import React dan hook useState
import { Link, useLocation } from "react-router";

// Import ikon menu dari react-icons
import {
  FiHome,
  FiInfo,
  FiUsers,
  FiBookOpen,
  FiShoppingBag,
  FiImage,
} from "react-icons/fi";

// Daftar link menu
const navLinks = [
  { path: "/", label: "Beranda", icon: FiHome },
  { path: "/pages", label: "Tentang Desa", icon: FiInfo },
  { path: "/aparaturs", label: "Aparaturs", icon: FiUsers },
  { path: "/posts", label: "Berita", icon: FiBookOpen },
  { path: "/products", label: "Produk Desa", icon: FiShoppingBag },
  { path: "/photos", label: "Galeri", icon: FiImage },
];

const MenuDesktop: React.FC = () => {
  // Ambil lokasi saat ini dari useLocation
  const location = useLocation();

  // Fungsi cek aktif
  const isActive = (path: string) => {
    // Khusus untuk homepage
    if (path === "/") {
      return location.pathname === "/";
    }

    // Untuk path lain
    return location.pathname.startsWith(path);
  };

  return (
    <div className="hidden md:flex items-center space-x-1 h-full">
      {navLinks.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 group relative h-13 
            ${
              isActive(path)
                ? "bg-yellow-800/80 text-white shadow-md"
                : "text-white/90 hover:bg-yellow-800/80 hover:text-white hover:shadow-md"
            }`}
        >
          <Icon className="h-5 w-5 text-yellow-300" />
          <span className="font-medium">{label}</span>
          <span
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-yellow-400 scale-x-0 
              group-hover:scale-x-100 transition-transform duration-300 ${
                isActive(path) ? "scale-x-100" : ""
              }`}
          ></span>
        </Link>
      ))}
    </div>
  );
};

export default MenuDesktop;
