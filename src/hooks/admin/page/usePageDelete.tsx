// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import js-cookie
import Cookies from "js-cookie";

// Hook untuk delete page
export const usePageDelete = () => {
  return useMutation({
    // Mutation function untuk delete page
    mutationFn: async (id: number) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Kirim request DELETE ke endpoint API
      const response = await Api.delete(`/api/admin/pages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data dari response
      return response.data;
    },
  });
};
