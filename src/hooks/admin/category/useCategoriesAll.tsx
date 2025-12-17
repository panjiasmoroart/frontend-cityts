// import hook useQuery from react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type Category
import type { Category } from "../../../types/category";

// import js-cookie
import Cookies from "js-cookie";

// hook useCategoriesAll dengan return type yang benar
export const useCategoriesAll = () => {
  return useQuery<Category[], Error>({
    // query key untuk caching
    queryKey: ["categories-all"],

    // query function
    queryFn: async () => {
      // get token from cookies
      const token = Cookies.get("token");

      // get categories from api
      const response = await Api.get("/api/admin/categories/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return the entire response data (array Category[])
      return response.data.data;
    },
  });
};
