// Import React
import React from "react";

// Import component layout
import AdminLayout from "../../../layouts/admin";

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-500">Ringkasan konten dan data terbaru</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
