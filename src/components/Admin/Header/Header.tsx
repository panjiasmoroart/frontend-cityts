// Import React
import React from "react";

// Import ikon menu dari react-icons
import { FiMenu } from "react-icons/fi";

// Import state global untuk tema (sidebar dan ukuran layar)
import { useThemeStore } from "../../../stores/theme";

// Import component dropdown user
import UserDropdown from "./UserDropdown";

const Header: React.FC = () => {
  // Ambil state dan fungsi dari store tema
  const { sidebarOpen, isMobile, toggleSidebar } = useThemeStore();

  return (
    // Header utama dengan background putih dan bayangan
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center">
          {/* Tampilkan tombol menu jika sidebar tertutup atau layar mobile */}
          {(!sidebarOpen || isMobile) && (
            <button
              onClick={toggleSidebar}
              className="mr-4 p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              {/* Ikon menu */}
              <FiMenu className="h-6 w-6 text-gray-500" />
            </button>
          )}
        </div>
        {/* Dropdown untuk user (misal: profil, logout) */}
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
