// import hook useQuery from react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type Page
import type { Page } from "../../../types/page";

// import js-cookie
import Cookies from "js-cookie";

// hook usePageById dengan parameter id dan return type Page
export const usePageById = (id: number) => {
  return useQuery<Page, Error>({
    // query key, disesuaikan dengan ID page untuk caching
    queryKey: ["page", id],

    // query function
    queryFn: async () => {
      // get token from cookies
      const token = Cookies.get("token");

      // request ke API untuk mendapatkan data page berdasarkan id
      const response = await Api.get(`/api/admin/pages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return data
      return response.data.data as Page;
    },
  });
};
