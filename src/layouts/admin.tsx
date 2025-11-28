// Import React dan hook useEffect
import React, { useEffect } from "react";

// Import store untuk manajemen state layout
import { useThemeStore } from "../stores/theme";

// Import component sidebar dan header
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import Header from "../components/Admin/Header/Header";

// component layout utama untuk halaman admin
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Ambil state dan fungsi dari theme store
  const { sidebarOpen, isMobile, setMobile } = useThemeStore();

  useEffect(() => {
    // Fungsi untuk mendeteksi ukuran layar
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setMobile(mobile);
      // Buka sidebar otomatis saat di desktop
      if (!mobile) useThemeStore.setState({ sidebarOpen: true });
    };

    // Jalankan saat resize dan pertama kali load
    window.addEventListener("resize", handleResize);
    handleResize();

    // Bersihkan event saat component di-unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobile]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay hitam untuk mode mobile saat sidebar terbuka */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => useThemeStore.setState({ sidebarOpen: false })}
        />
      )}

      {/* Sidebar kiri */}
      <Sidebar />

      {/* Konten utama (header + konten halaman) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
