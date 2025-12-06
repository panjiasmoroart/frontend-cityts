// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

//import type Permission
import type { PermissionUpdateRequest } from "../../../types/permission";

// import js-cookie
import Cookies from "js-cookie";

// Hook untuk update permission
export const usePermissionUpdate = () => {
  return useMutation({
    // Mutation function untuk update permission
    mutationFn: async (data: PermissionUpdateRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Kirim request update ke API
      const response = await Api.put(
        `/api/admin/permissions/${data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kembalikan data response
      return response.data;
    },
  });
};
