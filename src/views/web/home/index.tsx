// Import React
import React from "react";

// Import component layout
import WebLayout from "../../../layouts/web";

const HomePage: React.FC = () => {
  return (
    <WebLayout>
      <section className="w-full py-16 bg-linear-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12">
            <div className="p-6">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Home</h1>
                <p className="text-gray-500">
                  Selamat datang di website City Santry Kota Depok
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WebLayout>
  );
};

export default HomePage;
