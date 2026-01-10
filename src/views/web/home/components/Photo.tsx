// import type FC dari React
import type { FC } from "react";

// import icon dari react-icons
import { FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// import custom hook untuk mengambil data foto
import { usePhotosHome } from "../../../../hooks/web/photo/usePhotosHome";

// import custom hook untuk mengelola lightbox
import { usePhotoLightbox } from "../../../../hooks/web/photo/usePhotoLightbox";

// import component CardPhoto
import CardPhoto from "../../../../components/Web/Card/CardPhoto";

// import component Loading
import Loading from "../../../../components/General/Loading";

// import component Error
import Error from "../../../../components/General/Error";

const Photo: FC = () => {
  // Ambil data foto dari API menggunakan custom hook
  const { data: photos = [], isLoading, isError } = usePhotosHome();

  // Gunakan custom hook untuk mengelola state lightbox
  const { selectedPhoto, openLightbox, closeLightbox, navigatePhotos } =
    usePhotoLightbox(photos.length);

  return (
    <section
      className="w-full py-16 bg-linear-to-b from-white to-yellow-50"
      id="gallery"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-yellow-100 rounded-full shadow">
            <FiImage className="h-5 w-5 text-yellow-700" />
            <h3 className="text-lg font-semibold text-yellow-800">
              GALERI FOTO
            </h3>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan keindahan Desa Santri
          </p>
        </div>

        {isLoading && <Loading />}
        {isError && <Error />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {!isLoading &&
            !isError &&
            photos.map((photo, index) => (
              <CardPhoto
                key={index}
                photo={photo}
                index={index}
                onClick={openLightbox}
              />
            ))}
        </div>

        {selectedPhoto !== null && (
          <LightboxModal
            photo={photos[selectedPhoto]}
            currentIndex={selectedPhoto}
            totalPhotos={photos.length}
            onClose={closeLightbox}
            onNavigate={navigatePhotos}
          />
        )}
      </div>
    </section>
  );
};

// interface untuk props LightboxModal
interface LightboxModalProps {
  photo: {
    image: string;
    caption: string;
    description: string;
  };
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

const LightboxModal: FC<LightboxModalProps> = ({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onNavigate,
}) => (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-yellow-400 transition-colors"
    >
      &times;
    </button>

    <button
      onClick={() => onNavigate("prev")}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all z-10"
    >
      <FiChevronLeft className="h-8 w-8" />
    </button>

    <div className="relative max-w-4xl w-full">
      <img
        src={`${import.meta.env.VITE_BASE_URL}/uploads/photos/${photo.image}`}
        alt={photo.caption}
        className="max-h-[80vh] w-full object-contain rounded-lg"
      />
      <div className="mt-4 text-center text-white">
        <h3 className="text-xl font-bold">{photo.caption}</h3>
        <p className="text-gray-300 mt-2">{photo.description}</p>
        <p className="text-sm text-gray-400 mt-4">
          {currentIndex + 1} / {totalPhotos}
        </p>
      </div>
    </div>

    <button
      onClick={() => onNavigate("next")}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all z-10"
    >
      <FiChevronRight className="h-8 w-8" />
    </button>
  </div>
);

export default Photo;
