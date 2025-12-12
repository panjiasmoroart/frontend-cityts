// import useMutation dari '@tanstack/react-query'
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { RoleCreateRequest } from "../../../types/role";

// import js-cookie
import Cookies from "js-cookie";

// custom hook untuk create role
export const useRoleCreate = () => {
  return useMutation({
    // fungsi untuk mengirim data ke API
    mutationFn: async (data: RoleCreateRequest) => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // kirim request POST ke endpoint pembuatan role
      const response = await Api.post("/api/admin/roles", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // kembalikan data response
      return response.data;
    },
  });
};
