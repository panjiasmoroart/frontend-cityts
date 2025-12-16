// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { UserUpdateRequest } from "../../../types/user";

// import js-cookie
import Cookies from "js-cookie";

// Hook untuk update user
export const useUserUpdate = () => {
  return useMutation({
    // Mutation function untuk update user
    mutationFn: async (data: UserUpdateRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Kirim request update ke API
      const response = await Api.put(`/api/admin/users/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data response
      return response.data;
    },
  });
};
