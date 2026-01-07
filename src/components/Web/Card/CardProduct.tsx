// import icon
import { FiMessageCircle } from "react-icons/fi";

// import Link
import { Link } from "react-router";

// import type
import type { Product } from "../../../types/product";

// interface
interface ProductCardProps {
  product: Product;
  visibleProducts?: number;
}

export default function CardProduct({
  product,
  visibleProducts = 4,
}: ProductCardProps) {
  return (
    <article
      className="px-2 mb-3"
      style={{ flex: `0 0 ${100 / visibleProducts}%` }}
    >
      <div className="bg-white w-full rounded-2xl shadow overflow-hidden group hover:shadow-md transition-all duration-300 h-full flex flex-col">
        {/* Gambar produk */}
        <div className="relative overflow-hidden h-60">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/uploads/products/${
              product.image
            }`}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Konten */}
        <div className="p-5 grow flex flex-col">
          <div className="grow">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {product.title}
            </h3>

            <p className="text-yellow-600 font-bold text-xl mb-4">
              {product.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>

          {/* CTA */}
          <Link
            to={`/products/${product.slug}`}
            aria-label={`Beli ${product.title} sekarang`}
            className="w-full bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiMessageCircle className="h-5 w-5" />
            <span className="font-medium">Beli Sekarang</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
