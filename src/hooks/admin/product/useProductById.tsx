// import hook useQuery dari react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type Product
import type { Product } from "../../../types/product";

// import js-cookie
import Cookies from "js-cookie";

// hook useProductById dengan parameter id dan return type Product
export const useProductById = (id: number) => {
  return useQuery<Product, Error>({
    // query key untuk caching berdasarkan ID produk
    queryKey: ["product", id],

    // query function
    queryFn: async () => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // ambil data produk dari API berdasarkan ID
      const response = await Api.get(`/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return data produk
      return response.data.data as Product;
    },
  });
};
