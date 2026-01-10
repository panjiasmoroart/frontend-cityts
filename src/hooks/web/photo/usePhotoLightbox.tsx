// import useState from React
import { useState } from "react";

export const usePhotoLightbox = (photosLength: number) => {
  // State untuk foto yang dipilih (null jika tidak ada)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Function untuk membuka, menutup, dan navigasi lightbox
  const openLightbox = (index: number) => setSelectedPhoto(index);
  const closeLightbox = () => setSelectedPhoto(null);

  // Function untuk navigasi foto
  const navigatePhotos = (direction: "prev" | "next") => {
    if (selectedPhoto !== null) {
      if (direction === "prev") {
        setSelectedPhoto((prev) => (prev === 0 ? photosLength - 1 : prev! - 1));
      } else {
        setSelectedPhoto((prev) => (prev === photosLength - 1 ? 0 : prev! + 1));
      }
    }
  };

  // Mengembalikan objek yang berisi fungsi-fungsi untuk lightbox
  return {
    selectedPhoto,
    openLightbox,
    closeLightbox,
    navigatePhotos,
  };
};
