// import hook useQuery from react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type Page
import type { PagesResponse } from "../../../types/page";

// import type
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// Hook usePages dengan paginasi dan pencarian
export const usePages = ({ page, search }: Params) => {
  return useQuery<PagesResponse, Error>({
    // Query key dengan parameter untuk caching
    queryKey: ["pages", page, search],

    // Query function
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Request ke API
      const response = await Api.get(
        `/api/admin/pages?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Return data response
      return response.data.data;
    },
  });
};
