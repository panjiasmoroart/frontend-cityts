// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import Api service
import Api from "../../../services/api";

// --- Interface untuk Slider
import type { SlidersResponse } from "../../../types/slider";

// import type
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// --- Hook React Query
export const useSliders = ({ page, search }: Params) => {
  return useQuery<SlidersResponse>({
    // query key unik untuk caching berdasarkan parameter
    queryKey: ["sliders", page, search],

    // query function
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Request GET ke endpoint API
      const response = await Api.get(
        `/api/admin/sliders?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kembalikan data dari response
      return response.data.data;
    },
  });
};
