// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import js-cookie
import Cookies from "js-cookie";

// Hook untuk delete slider
export const useSliderDelete = () => {
  return useMutation({
    // Mutation function untuk delete slider
    mutationFn: async (id: number) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Lakukan request DELETE ke endpoint API
      const response = await Api.delete(`/api/admin/sliders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan response
      return response.data;
    },
  });
};
