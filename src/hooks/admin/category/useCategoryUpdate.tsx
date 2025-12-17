// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { CategoryUpdateRequest } from "../../../types/category";

// import js-cookie
import Cookies from "js-cookie";

// Hook untuk update category
export const useCategoryUpdate = () => {
  return useMutation({
    // Mutation function untuk update category
    mutationFn: async (data: CategoryUpdateRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Kirim request update ke API
      const response = await Api.put(`/api/admin/categories/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data response
      return response.data;
    },
  });
};
