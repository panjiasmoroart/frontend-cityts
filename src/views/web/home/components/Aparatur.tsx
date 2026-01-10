// import useRef, type FC dari react
import { useRef, type FC } from "react";

// import icon dari react-icons
import { FiUsers, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// import hook untuk mengambil data aparatur
import { useAparatursHome } from "../../../../hooks/web/aparatur/useAparatursHome";

// import hook untuk mengelola state carousel
import { useAparaturCarousel } from "../../../../hooks/web/aparatur/useAparaturCarousel";

// import component CardAparatur
import CardAparatur from "../../../../components/Web/Card/CardAparatur";

// import component Loading
import Loading from "../../../../components/General/Loading";

// import component Error
import Error from "../../../../components/General/Error";

const Aparatur: FC = () => {
  // Ambil data aparatur dari API menggunakan custom hook
  const { data: aparaturs = [], isLoading, isError } = useAparatursHome();

  // Gunakan custom hook untuk mengelola state carousel
  const { currentIndex, visibleItems, nextSlide, prevSlide } =
    useAparaturCarousel(aparaturs.length);

  // Ref untuk elemen carousel
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="w-full py-16 bg-linear-to-b from-yellow-50 to-white"
      id="officials"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-yellow-100 rounded-full shadow">
            <FiUsers className="h-5 w-5 text-yellow-700" />
            <h3 className="text-lg font-semibold text-yellow-800">
              APARATUR DESA
            </h3>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kenali para aparatur desa yang bertugas melayani masyarakat
          </p>
        </div>

        {isLoading && <Loading />}
        {isError && <Error />}

        <div className="relative group">
          <div ref={carouselRef} className="overflow-hidden px-2">
            <div
              className="flex transition-transform duration-500 ease-out py-8"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleItems)
                }%)`,
                width: `100%`,
              }}
            >
              {!isLoading &&
                !isError &&
                aparaturs?.map((aparatur, index) => (
                  <div
                    key={index}
                    className="shrink-0 px-2" // penting: jangan boleh menyusut
                    style={{ width: `${100 / visibleItems}%` }} // lebar per slide = 100/visibleItems%
                  >
                    <CardAparatur aparatur={aparatur} variant="carousel" />
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Previous official"
          >
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Next official"
          >
            <FiChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Aparatur;
