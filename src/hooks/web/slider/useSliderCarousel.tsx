// import useState and useEffect from react
import { useState, useEffect } from "react";

export const useSliderCarousel = (
  slidesLength: number,
  autoPlayInterval: number = 5000
) => {
  // State untuk slide saat ini dan hover status
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    // Jika tidak ada slide, keluar
    if (!slidesLength) return;

    // Set interval untuk auto-slide
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % slidesLength);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isHovered, slidesLength, autoPlayInterval]);

  // Function untuk navigasi slide ke depan
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesLength);
  };

  // Function untuk navigasi slide ke belakang
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesLength) % slidesLength);
  };

  // Function untuk navigasi langsung ke slide tertentu
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Return state dan fungsi-fungsi
  return {
    currentSlide,
    isHovered,
    setIsHovered,
    nextSlide,
    prevSlide,
    goToSlide,
  };
};
