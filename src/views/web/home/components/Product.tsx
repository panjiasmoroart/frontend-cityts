// import useRef dari react
import { useRef, type FC } from "react";

// import ikon dari react-icons
import { FiShoppingBag, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// import hook untuk mengambil data produk
import { useProductsHome } from "../../../../hooks/web/product/useProductsHome";

// import hook untuk mengelola state carousel
import { useProductCarousel } from "../../../../hooks/web/product/useProductCarousel";

// import component CardProduct
import CardProduct from "../../../../components/Web/Card/CardProduct";

// import component Loading
import Loading from "../../../../components/General/Loading";

// import component Error
import Error from "../../../../components/General/Error";

const Product: FC = () => {
  // Ambil data produk dari API menggunakan custom hook
  const { data: products = [], isLoading, isError } = useProductsHome();

  // Gunakan custom hook untuk mengelola state carousel
  const { currentIndex, visibleItems, nextSlide, prevSlide } =
    useProductCarousel(products.length);

  // Ref untuk elemen carousel
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="w-full py-16 bg-linear-to-b from-yellow-50 to-white"
      id="products"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-yellow-100 rounded-full shadow">
            <FiShoppingBag className="h-5 w-5 text-yellow-700" />
            <h4 className="text-lg font-semibold text-yellow-800">
              PRODUK KOTA
            </h4>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai produk berkualitas hasil karya warga kota kami
          </p>
        </div>

        {isLoading && <Loading />}
        {isError && <Error />}

        <div className="relative group">
          <div ref={carouselRef} className="overflow-hidden px-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleItems)
                }%)`,
                width: `100%`,
              }}
            >
              {!isLoading &&
                !isError &&
                products.map((product, index) => (
                  <CardProduct
                    key={index}
                    product={product}
                    visibleProducts={visibleItems}
                  />
                ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Previous products"
          >
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Next products"
          >
            <FiChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
