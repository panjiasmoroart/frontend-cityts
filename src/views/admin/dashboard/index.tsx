// Import React
import React, { useEffect } from "react";

// Import react-router
import { Link } from "react-router";

// Import react-icons
import { FiFolder, FiFileText, FiShoppingBag, FiUsers } from "react-icons/fi";

// Import component layout
import AdminLayout from "../../../layouts/admin";

// import hook useDashboard
import { useDashboard } from "../../../hooks/admin/dashboard/useDashboard";

const DashboardPage: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Dashboard - City Santri Kab. Depok";
  }, []);

  // useDashboard
  const { data } = useDashboard();

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-500">Ringkasan konten dan data terbaru</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Kategori Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-lg bg-indigo-50 mr-4">
                  <FiFolder className="text-indigo-500" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {data?.categories_count}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  Kategori
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <Link
                to="/admin/categories"
                className="text-xs font-medium text-primary-600 hover:text-primary-800 flex items-center"
              >
                Lihat detail
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Postingan Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-lg bg-blue-50 mr-4">
                  <FiFileText className="text-blue-500" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {data?.posts_count}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  Postingan
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <Link
                to="/admin/posts"
                className="text-xs font-medium text-primary-600 hover:text-primary-800 flex items-center"
              >
                Lihat detail
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Produk Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-lg bg-amber-50 mr-4">
                  <FiShoppingBag className="text-amber-500" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {data?.products_count}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Produk</p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <Link
                to="/admin/products"
                className="text-xs font-medium text-primary-600 hover:text-primary-800 flex items-center"
              >
                Lihat detail
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Aparatur Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-lg bg-green-50 mr-4">
                  <FiUsers className="text-green-500" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {data?.aparaturs_count}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  Aparatur
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <Link
                to="/admin/aparaturs"
                className="text-xs font-medium text-primary-600 hover:text-primary-800 flex items-center"
              >
                Lihat detail
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
