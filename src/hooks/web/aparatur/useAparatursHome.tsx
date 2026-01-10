// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import type Aparatur
import type { Aparatur } from "../../../types/aparatur";

// import Api service
import Api from "../../../services/api";

// --- Hook React Query
export const useAparatursHome = () => {
  return useQuery<Aparatur[]>({
    // query key unik untuk caching berdasarkan parameter
    queryKey: ["web-aparaturs-home"],

    // query function
    queryFn: async () => {
      // Request GET ke endpoint API
      const response = await Api.get(`/api/public/aparaturs_home`);

      // Kembalikan data dari response
      return response.data.data as Aparatur[];
    },
  });
};
