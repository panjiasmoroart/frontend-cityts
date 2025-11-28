// Import React
import React, { useState, useRef, useEffect } from "react";

// Import ikon dari react-icons
import { FiChevronDown, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

// import useAuthStore from auth store
import { useAuthStore } from "../../../stores/auth";

//import hook useNavigate from react router
import { useNavigate } from "react-router";

const UserDropdown: React.FC = () => {
  // state lokal untuk membuka/menutup dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ref untuk deteksi klik di luar dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // user dan logout dari store
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  // fungsi logout
  const logoutHandler = async () => {
    // panggil fungsi logout
    await logout();

    // kembali ke halaman login
    navigate("/login");
  };

  // fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
      <div className="relative group">
        {/* Tombol untuk membuka/menutup dropdown */}
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={toggleDropdown}
        >
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-yellow-100 to-yellow-200 flex items-center justify-center text-yellow-700 font-bold shadow-sm border border-yellow-200">
            {user?.name?.charAt(0)}
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700">
              {user?.name}
            </span>
            <span className="text-xs text-gray-500">@{user?.username}</span>
          </div>
          <FiChevronDown
            className={`hidden md:block text-gray-500 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50 border border-gray-100">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-800">{user?.email}</p>
            </div>

            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-150"
            >
              <FiUser className="inline mr-2" /> Profil Saya
            </a>

            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-150"
            >
              <FiSettings className="inline mr-2" /> Pengaturan
            </a>

            <div className="border-t border-gray-100"></div>

            <a
              onClick={logoutHandler}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-150 cursor-pointer"
            >
              <FiLogOut className="inline mr-2" /> Keluar
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
