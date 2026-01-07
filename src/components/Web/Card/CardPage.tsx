// import type FC
import type { FC } from "react";

// import icon dari react-icons
import { FiArrowRight } from "react-icons/fi";

// import interface Page
import type { Page } from "../../../types/page";

// import Link dari react-router
import { Link } from "react-router";

// type CardPage
interface CardPageProps {
  page: Page;
}

const CardPage: FC<CardPageProps> = ({ page }) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow">
      <Link
        to={`/pages/${page.slug}`}
        aria-label={`Buka halaman: ${page.title}`}
      >
        {/* Card Content - Minimalist Design */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-500 transition-colors duration-200">
              {page.title}
            </h3>

            {/* Subtle Animated Arrow */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-amber-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <FiArrowRight
                className="relative text-gray-400 group-hover:text-amber-600 transition-all duration-300 transform translate-x-0 group-hover:translate-x-0.5"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Hover Effect - Modern Gradient Border */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-amber-100/50 pointer-events-none transition-all duration-500" />
      </Link>
    </div>
  );
};

export default CardPage;
