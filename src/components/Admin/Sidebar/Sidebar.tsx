// Import React
import React from "react";

// Import state global dari theme store
import { useThemeStore } from "../../../stores/theme";

// Import component header sidebar
import SidebarHeader from "./SidebarHeader";

// Import component menu sidebar
import SidebarMenu from "./SidebarMenu";

const Sidebar: React.FC = () => {
  // Ambil status sidebar (terbuka/tutup) dan apakah di layar mobile
  const { sidebarOpen, isMobile } = useThemeStore();

  return (
    // Container sidebar dengan animasi transisi
    <div
      className={`bg-white shadow-lg transform transition-all duration-300 ease-in-out z-30
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                ${isMobile ? "fixed inset-y-0 left-0 w-75" : "relative w-75"}`}
    >
      {/* Bagian atas sidebar (biasanya logo atau judul) */}
      <SidebarHeader />
      {/* Daftar menu navigasi */}
      <SidebarMenu />
    </div>
  );
};

export default Sidebar;
