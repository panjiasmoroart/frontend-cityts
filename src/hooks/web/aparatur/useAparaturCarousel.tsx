// import useState, useEffect dari react
import { useState, useEffect } from "react";

export const useAparaturCarousel = (itemsLength: number) => {
  // State untuk index saat ini dan jumlah item yang terlihat
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    // Function untuk memperbarui jumlah item yang terlihat berdasarkan lebar layar
    const updateVisibleItems = () => {
      // Mobile: tampilkan ~1.2 item (efek "peek"), Desktop: 4 item
      setVisibleItems(window.innerWidth < 768 ? 1.2 : 4);
    };

    // Inisialisasi
    updateVisibleItems();

    // Event listener untuk resize
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Function untuk navigasi slide ke depan
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (itemsLength - visibleItems + 1));
  };

  // Function untuk navigasi slide ke belakang
  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (itemsLength - visibleItems + 1)) %
        (itemsLength - visibleItems + 1)
    );
  };

  return {
    currentIndex,
    visibleItems,
    nextSlide,
    prevSlide,
  };
};
