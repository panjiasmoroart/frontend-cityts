// import hook useQuery from react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type Category
import type { CategoriesResponse } from "../../../types/category";

// import type
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// hook useCategories dengan return type yang benar
export const useCategories = ({ page, search }: Params) => {
  return useQuery<CategoriesResponse, Error>({
    // query key yang mencakup parameter untuk caching yang benar
    queryKey: ["categories", page, search],

    // query function
    queryFn: async () => {
      // get token from cookies
      const token = Cookies.get("token");

      // get categories from api
      const response = await Api.get(
        `/api/admin/categories?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // return the entire response data (not just data.data)
      return response.data.data;
    },
  });
};
