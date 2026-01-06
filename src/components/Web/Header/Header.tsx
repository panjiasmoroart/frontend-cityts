// Import React
import React from "react";

// Import ikon menu dari react-icons
import {
  FiMail,
  FiPhone,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiMenu,
  FiCheck,
} from "react-icons/fi";

// import store untuk manajemen state tema (drawer)
import { useThemeStore } from "../../../stores/theme";

// import component drawer mobile
import MenuMobile from "./MenuMobile";

// import component navigasi desktop
import MenuDesktop from "./MenuDesktop";

const Header: React.FC = () => {
  // ambil fungsi untuk membuka/menutup drawer dari store
  const { toggleDrawer } = useThemeStore();

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-yellow-800 text-white text-xs py-2">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FiMail className="h-3 w-3" />
              <span>info@desa-santri.com</span>
            </div>
            <div className="flex items-center gap-1">
              <FiPhone className="h-3 w-3" />
              <span>+62 857-8585-2224</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>IKUTI KAMI :</span>
            <a
              href="#"
              aria-label="Facebook"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              <FiFacebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              <FiInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Youtube"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              <FiYoutube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="bg-yellow-500 py-4">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-4">
            {/* Logo dan Judul */}
            <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:gap-3 w-full md:w-auto">
              <div className="relative group my-2 md:my-3">
                {/* bayangan dasar */}
                <div className="absolute inset-0 rounded-2xl bg-yellow-600 translate-y-2"></div>

                {/* kartu logo */}
                <div className="relative h-full w-full rounded-2xl bg-linear-to-br from-yellow-400 to-yellow-500 border-2 border-yellow-300 shadow-xl transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl flex items-center justify-center p-2 md:p-3">
                  <img
                    src="/images/logo-jbg.png"
                    alt="Logo Desa"
                    className="h-full w-full object-contain filter drop-shadow-sm"
                    style={{ width: "60px", height: "60px" }}
                  />
                </div>

                {/* lencana pojok */}
                <div className="absolute -top-2 -right-4 h-7 w-7 md:h-8 md:w-8 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center">
                  <FiCheck className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
              </div>

              <div className="text-stone-900 mt-2 md:mt-0 ml-3">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                  <span className="bg-linear-to-r from-yellow-800 via-yellow-700 to-amber-600 bg-clip-text text-transparent">
                    DESA SANTRI
                  </span>
                </h1>
                {/* perbaikan: gunakan 'border' (Tailwind tidak punya 'border-1') */}
                <hr className="border border-yellow-400 my-1 md:my-2 mx-auto md:mx-0 w-3/4 md:w-full" />
                <p className="text-xs md:text-sm">
                  Jln. Diponegoro No. 58, Wonosalam, Jombang, Jawa Timur, 61473
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto flex-1 max-w-md md:max-w-sm">
              {/* perbaikan: cegah full reload saat submit */}
              <form
                className="relative w-full"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Form pencarian"
              >
                <input
                  type="search"
                  placeholder="Cari informasi..."
                  aria-label="Cari informasi"
                  className="w-full bg-white/90 backdrop-blur-sm text-stone-800 placeholder-stone-500 rounded-full py-3 px-5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2 focus:ring-offset-yellow-500 shadow-md transition-all duration-200 hover:shadow-lg"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                >
                  <span className="bg-yellow-700 hover:bg-yellow-800 text-white font-medium py-1 px-3 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                    Cari
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-linear-to-r from-yellow-700 to-yellow-600 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Menu desktop */}
            <MenuDesktop />

            {/* Tombol hamburger (mobile) */}
            <button
              onClick={toggleDrawer}
              className="md:hidden text-white p-2 rounded-lg hover:bg-yellow-800/80 transition-all"
              aria-label="Buka menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MenuMobile />
    </header>
  );
};

export default Header;
