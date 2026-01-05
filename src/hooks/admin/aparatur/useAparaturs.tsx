// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import Api service
import Api from "../../../services/api";

// import type
import type { AparatursResponse } from "../../../types/aparatur";

// import type
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// --- Hook React Query
export const useAparaturs = ({ page, search }: Params) => {
  return useQuery<AparatursResponse>({
    // query key yang mencakup parameter untuk caching yang benar
    queryKey: ["aparaturs", page, search],

    // query function
    queryFn: async () => {
      // get token from cookies
      const token = Cookies.get("token");

      // get aparaturs from api
      const response = await Api.get(
        `/api/admin/aparaturs?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // return the entire response data
      return response.data.data;
    },
  });
};
