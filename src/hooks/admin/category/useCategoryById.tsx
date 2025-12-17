// import hook useQuery from react-query
import { useQuery } from "@tanstack/react-query";

//import service Api
import Api from "../../../services/api";

//import type Category
import type { Category } from "../../../types/category";

// import js-cookie
import Cookies from "js-cookie";

//hook useCategoryById dengan parameter id dan return type Category
export const useCategoryById = (id: number) => {
  return useQuery<Category, Error>({
    //query key, disesuaikan dengan ID category untuk caching
    queryKey: ["category", id],

    //query function
    queryFn: async () => {
      //get token from cookies
      const token = Cookies.get("token");

      //request data category berdasarkan ID dari API
      const response = await Api.get(`/api/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //return data category
      return response.data.data as Category;
    },
  });
};
