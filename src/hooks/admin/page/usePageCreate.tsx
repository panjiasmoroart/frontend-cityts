// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

//import type Page
import type { PageCreateRequest } from "../../../types/page";

// import js-cookie
import Cookies from "js-cookie";

export const usePageCreate = () => {
  return useMutation({
    // mutation untuk create page
    mutationFn: async (data: PageCreateRequest) => {
      // get token from cookies
      const token = Cookies.get("token");

      // request ke API untuk membuat page
      const response = await Api.post("/api/admin/pages", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // mengembalikan response data
      return response.data;
    },
  });
};
