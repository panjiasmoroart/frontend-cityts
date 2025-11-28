// Import React
import React from "react";

// Import state global dari theme store
import { useThemeStore } from "../../../stores/theme";

const SidebarHeader: React.FC = () => {
  // Ambil status dan fungsi dari theme store
  const { sidebarOpen, isMobile, toggleSidebar } = useThemeStore();

  return (
    // Header sidebar dengan background gradasi dan border bawah
    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-linear-to-r from-yellow-50 to-white">
      <div className="flex items-center">
        {/* Logo dengan efek hover dan bayangan */}
        <div className="relative h-12 w-12 group">
          {/* Bayangan bawah saat hover */}
          <div className="absolute inset-0 rounded-xl bg-yellow-600 translate-y-1 transform group-hover:translate-y-1.5 transition-all duration-300"></div>

          {/* Background utama logo */}
          <div className="relative h-full w-full rounded-xl bg-linear-to-br from-yellow-300 to-yellow-400 border-2 border-yellow-100 shadow-lg transform transition-all duration-300 group-hover:-translate-y-0.5 flex items-center justify-center p-1.5">
            <img
              src="/images/logo-jbg.png"
              alt="Logo Desa"
              className="h-full w-full object-contain filter drop-shadow-sm"
            />
          </div>

          {/* Icon status/verifikasi di pojok kanan atas logo */}
          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center">
            <svg
              className="h-3 w-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Tampilkan judul jika sidebar terbuka */}
        {sidebarOpen && (
          <h4 className="ml-3 text-left">
            {/* Nama desa */}
            <span className="text-md font-extrabold bg-clip-text text-transparent bg-linear-to-r from-yellow-600 to-yellow-800 tracking-tight">
              CITY SANTRI
            </span>
            {/* Nama kabupaten */}
            <span className="block text-xs font-medium text-gray-500 mt-0.5 tracking-wider uppercase">
              <span className="inline-block bg-gray-100 px-1.5 py-0.5 rounded-md border border-gray-200 shadow-inner">
                DEPOK
              </span>
            </span>
          </h4>
        )}
      </div>

      {/* Tombol close sidebar (khusus mobile dan saat sidebar terbuka) */}
      {isMobile && sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-yellow-100 transition-colors duration-200 group"
        >
          {/* Ikon close berupa dua garis silang */}
          <div className="relative h-6 w-6">
            <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:rotate-0 transition-transform duration-300"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;
