// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import type Photo
import type { Photo } from "../../../types/photo";

// import Api service
import Api from "../../../services/api";

// --- Hook React Query
export const usePhotosHome = () => {
  return useQuery<Photo[]>({
    // query key unik untuk caching berdasarkan parameter
    queryKey: ["web-photos-home"],

    // query function
    queryFn: async () => {
      // Request GET ke endpoint API
      const response = await Api.get(`/api/public/photos_home`);

      // Kembalikan data dari response
      return response.data.data as Photo[];
    },
  });
};
