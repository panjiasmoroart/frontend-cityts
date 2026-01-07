// import type FC
import type { FC } from "react";

// import icon dari react-icons
import { FiZoomIn } from "react-icons/fi";

// import interface Photo
import type { Photo } from "../../../types/photo";

// type PhotoCard
interface PhotoCardProps {
  photo: Photo;
  index: number;
  onClick: (index: number) => void;
}

const CardPhoto: FC<PhotoCardProps> = ({ photo, index, onClick }) => {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Lihat foto: ${photo.caption || "Foto galeri"}`}
      onClick={() => onClick(index)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(index)}
      className="relative overflow-hidden rounded-xl shadow-md group hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Area gambar dengan rasio 4:3 */}
      <div className="aspect-4/3 w-full">
        <img
          src={`${import.meta.env.VITE_BASE_URL}/uploads/photos/${photo.image}`}
          alt={photo.caption || "Foto galeri"}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Overlay info + ikon zoom */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        {photo.caption && (
          <h3 className="text-white font-medium text-lg">{photo.caption}</h3>
        )}
        {photo.description && (
          <p className="text-gray-200 text-sm mt-1 line-clamp-2">
            {photo.description}
          </p>
        )}

        {/* Ikon zoom di tengah */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FiZoomIn className="h-6 w-6 text-white" />
        </div>
      </div>
    </article>
  );
};

export default CardPhoto;
