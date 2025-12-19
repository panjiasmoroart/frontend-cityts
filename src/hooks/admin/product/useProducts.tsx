// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import Api service
import Api from "../../../services/api";

// --- Interface untuk Product
import type { ProductsResponse } from "../../../types/product";

// import type
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// --- Hook React Query untuk mengambil daftar product
export const useProducts = ({ page, search }: Params) => {
  return useQuery<ProductsResponse>({
    queryKey: ["products", page, search],

    queryFn: async () => {
      const token = Cookies.get("token");

      const response = await Api.get(
        `/api/admin/products?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    },
  });
};
