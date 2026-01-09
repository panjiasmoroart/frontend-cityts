// Import React
import React from "react";

// Import component layout
import WebLayout from "../../../layouts/web";
import Slider from "./components/Slider";
import Product from "./components/Product";

const HomePage: React.FC = () => {
  return (
    <WebLayout>
      {/* Slider Section */}
      <Slider />

      {/* Product Section */}
      <Product />
    </WebLayout>
  );
};

export default HomePage;
