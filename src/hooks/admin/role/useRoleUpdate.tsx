// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { RoleUpdateRequest } from "../../../types/role";

// import js-cookie
import Cookies from "js-cookie";

// Hook untuk update role
export const useRoleUpdate = () => {
  return useMutation({
    // Mutation function untuk update role
    mutationFn: async (data: RoleUpdateRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Kirim request update ke API
      const response = await Api.put(`/api/admin/roles/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data response
      return response.data;
    },
  });
};
