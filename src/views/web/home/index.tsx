// Import React
import React from "react";

// Import component layout
import WebLayout from "../../../layouts/web";
import Slider from "./components/Slider";

const HomePage: React.FC = () => {
  return (
    <WebLayout>
      {/* Slider Section */}
      <Slider />
    </WebLayout>
  );
};

export default HomePage;
