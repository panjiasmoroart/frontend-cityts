// import type FC
import type { FC } from "react";

// import Link dari react-router
import { Link } from "react-router";

// import type
import type { Aparatur } from "../../../types/aparatur";

// type AparaturCard
interface AparaturCardProps {
  aparatur: Aparatur;
  variant?: "grid" | "carousel";
}

const AparaturCard: FC<AparaturCardProps> = ({
  aparatur,
  variant = "grid",
}) => {
  // outerWrap
  const outerWrap = variant === "carousel" ? "" : "px-2 mb-4 mt-8";

  return (
    <div className={outerWrap}>
      <div className="bg-white rounded-2xl w-full shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center p-5 hover:border-yellow-100 group">
        {/* Profile image */}
        <div className="relative mb-6 -mt-12">
          <div className="absolute inset-0 rounded-full"></div>
          <div className="p-1 rounded-full bg-linear-to-br from-yellow-200 to-yellow-300">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/uploads/aparaturs/${
                aparatur.image
              }`}
              alt={aparatur.name}
              className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-sm group-hover:shadow-md transition-all duration-300"
            />
          </div>
        </div>

        {/* Name & Position */}
        <div className="px-4 pb-4 w-full">
          <h3 className="text-lg font-bold text-gray-800 mb-1.5 leading-tight">
            {aparatur.name}
          </h3>
          <p className="text-sm text-yellow-600 font-medium mb-4">
            {aparatur.position}
          </p>

          {/* Button Lihat Profil */}
          <div className="mt-2">
            <Link
              to={`/aparaturs/${aparatur.id}`}
              className="text-xs font-medium text-gray-500 hover:text-yellow-600 transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              Lihat Profil
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Decorative line */}
        <div className="w-full h-1 bg-linear-to-r from-transparent via-yellow-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto"></div>
      </div>
    </div>
  );
};

export default AparaturCard;
