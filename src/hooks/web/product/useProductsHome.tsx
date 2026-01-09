// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import type Product
import type { Product } from "../../../types/product";

// import Api service
import Api from "../../../services/api";

// --- Hook React Query
export const useProductsHome = () => {
  return useQuery<Product[]>({
    // query key unik untuk caching berdasarkan parameter
    queryKey: ["web-products-home"],

    // query function
    queryFn: async () => {
      // Request GET ke endpoint API
      const response = await Api.get(`/api/public/products_home`);

      // Kembalikan data dari response
      return response.data.data as Product[];
    },
  });
};
