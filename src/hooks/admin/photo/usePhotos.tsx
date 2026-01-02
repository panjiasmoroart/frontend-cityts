// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import Api service
import Api from "../../../services/api";

// --- Interface untuk Photo
import type { PhotosResponse } from "../../../types/photo";

// import type
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// --- Hook React Query
export const usePhotos = ({ page, search }: Params) => {
  return useQuery<PhotosResponse>({
    // query key unik untuk caching berdasarkan parameter
    queryKey: ["photos", page, search],

    // query function
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Request GET ke endpoint API
      const response = await Api.get(
        `/api/admin/photos?page=${page}&search=${search}`,
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
