// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import type
import type { Slider } from "../../../types/slider";

// import Api service
import Api from "../../../services/api";

// --- Hook React Query
export const useSliders = () => {
  return useQuery<Slider[]>({
    // query key unik untuk caching berdasarkan parameter
    queryKey: ["web-sliders"],

    // query function
    queryFn: async () => {
      // Request GET ke endpoint API
      const response = await Api.get(`/api/public/sliders`);

      // Kembalikan data dari response
      return response.data.data as Slider[];
    },
  });
};
