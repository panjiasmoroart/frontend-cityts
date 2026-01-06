// Import React
import React from "react";

// Import Link dari react-router untuk navigasi
import { Link } from "react-router";

// Import ikon dari react-icons
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiCheck,
} from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-linear-to-b from-gray-900 to-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Section 1: Brand Identity */}
        <div className="flex flex-col items-start space-y-5 col-span-2">
          <Link
            to="#"
            className="flex items-center gap-3 group relative"
            aria-label="City Santri Home"
          >
            {/* 3D Logo Container */}
            <div className="relative">
              {/* Shadow */}
              <div className="absolute -bottom-1 -right-1 w/full h/full bg-yellow-700 rounded-lg transition-all duration-300 group-hover:-bottom-1.5 group-hover:-right-1.5" />

              {/* Main Logo Card */}
              <div className="relative bg-linear-to-br from-yellow-400 to-yellow-500 p-2 rounded-lg transition-all duration-500 group-hover:rotate-3 group-hover:shadow-lg transform-style-preserve-3d">
                {/* Inner shine effect */}
                <div className="absolute inset-0 rounded-lg bg-linear-to-br from-white/20 to-transparent pointer-events-none" />

                {/* Logo Image */}
                <img
                  src="/images/logo-jbg.png"
                  alt="City Santri Logo"
                  className="w-12 h-12 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />

                {/* Corner accent */}
                <div className="absolute -top-2 -right-3 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                  <FiCheck className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Text with 3D effect */}
            <span className="text-2xl font-bold text-white relative">
              <span className="relative z-10 group-hover:text-yellow-300 transition-colors duration-300">
                CITY SANTRY
              </span>
              {/* Text shadow for 3D effect */}
              <span
                className="absolute top-0.5 left-0.5 text-2xl font-bold text-yellow-700 -z-10"
                aria-hidden="true"
              >
                CITY SANTRY
              </span>
            </span>
          </Link>
          <p className="text-gray-400 leading-relaxed">
            Cita Santry, Depok, Jawa Barat. Pusat kebudayaan dan spiritualitas
            di tengah keindahan alam.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <FiFacebook className="h-5 w-5" />, label: "Facebook" },
              { icon: <FiInstagram className="h-5 w-5" />, label: "Instagram" },
              { icon: <FiYoutube className="h-5 w-5" />, label: "YouTube" },
            ].map((social, index) => (
              <Link
                key={index}
                to="#"
                aria-label={social.label}
                className="bg-gray-800 hover:bg-yellow-600 text-gray-300 hover:text-white p-2 rounded-full transition-all duration-300"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-yellow-400 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-500">
            NAVIGASI
          </h3>
          <ul className="space-y-3">
            {[
              { text: "Beranda", href: "/" },
              { text: "Tentang Desa", href: "/pages" },
              { text: "Produk Desa", href: "/products" },
              { text: "Berita & Artikel", href: "/posts" },
              { text: "Galeri Foto", href: "/photos" },
              { text: "Aparaturs", href: "/aparaturs" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Mobile App */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-yellow-400 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-500">
            APLIKASI MOBILE
          </h3>
          <div className="space-y-4">
            <Link to="#" className="inline-block">
              <img
                src="/images/playstore.png"
                alt="Get it on Google Play"
                className="h-15 object-contain hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Dapatkan info update Desa lebih cepat melalui aplikasi Android
              kami.
            </p>
          </div>
        </div>

        {/* Section 4: Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-yellow-400 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-500">
            KONTAK KAMI
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-gray-800 p-2 rounded-full">
                <FiMapPin className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Jln. Pemuda No. 58, Sawangan Baru, Depok, Jawa Barat, 16511
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 p-2 rounded-full">
                <FiMail className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-gray-400 text-sm">info@city-santry.com</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 p-2 rounded-full">
                <FiPhone className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-gray-400 text-sm">+62 857-8585-2224</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 pt-12 mt-12 border-t border-gray-800">
        <p>
          &copy; {new Date().getFullYear()} CITY SANTRY. All Rights Reserved. |
          <Link
            to="/privacy"
            className="hover:text-yellow-400 ml-2 transition-colors"
          >
            Privacy Policy
          </Link>{" "}
          |
          <Link
            to="/terms"
            className="hover:text-yellow-400 ml-2 transition-colors"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
