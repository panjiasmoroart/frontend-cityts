// Import React
import React from "react";

// Import component layout
import WebLayout from "../../../layouts/web";
import Slider from "./components/Slider";
import Product from "./components/Product";
import Post from "./components/Post";

const HomePage: React.FC = () => {
  return (
    <WebLayout>
      {/* Slider Section */}
      <Slider />

      {/* Product Section */}
      <Product />

      {/* Post Section */}
      <Post />
    </WebLayout>
  );
};

export default HomePage;
