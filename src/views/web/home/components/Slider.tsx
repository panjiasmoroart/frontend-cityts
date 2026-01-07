// import React dan tipe FC
import { type FC } from "react";

// import ikon dari react-icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// import hook untuk mengambil data slider
import { useSliders } from "../../../../hooks/web/slider/useSliders";

// import hook untuk mengelola state slider
import { useSliderCarousel } from "../../../../hooks/web/slider/useSliderCarousel";

//import component Loading
import Loading from "../../../../components/General/Loading";

// import component Error
import Error from "../../../../components/General/Error";

const Slider: FC = () => {
  // Ambil data slider dari API menggunakan custom hook
  const { data, isLoading, isError } = useSliders();

  // Jika data null/undefined, gunakan array kosong
  const slides = data ?? [];

  // Gunakan custom hook untuk mengelola state slider
  const { currentSlide, setIsHovered, nextSlide, prevSlide, goToSlide } =
    useSliderCarousel(slides.length);

  // Tampilkan loading jika data masih dimuat
  if (isLoading) {
    return (
      <section
        className="w-full py-8 md:py-10 lg:py-12 bg-linear-to-b from-white to-yellow-50"
        id="hero"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <Loading />
        </div>
      </section>
    );
  }

  // Tampilkan error jika terjadi kesalahan
  if (isError) {
    return (
      <section
        className="w-full py-8 md:py-10 lg:py-12 bg-linear-to-b from-white to-yellow-50"
        id="hero"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <Error />
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full py-8 md:py-10 lg:py-12 bg-linear-to-b from-white to-yellow-50"
      id="hero"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div
          className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-2xl shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/sliders/${
                    slide.image
                  }`}
                  alt={`Slider ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <FiChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-4 md:w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
