// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

//import type Permission
import type { PermissionCreateRequest } from "../../../types/permission";

// import js-cookie
import Cookies from "js-cookie";

export const usePermissionCreate = () => {
  return useMutation({
    // mutation untuk create permission
    mutationFn: async (data: PermissionCreateRequest) => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // kirim request untuk membuat permission baru
      const response = await Api.post("/api/admin/permissions", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // kembalikan response data
      return response.data;
    },
  });
};
