// import hook useQuery from react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type Permission
import type { Permission } from "../../../types/permission";

// import js-cookie
import Cookies from "js-cookie";

// hook usePermissionById dengan parameter id dan return type Permission
export const usePermissionById = (id: number) => {
  return useQuery<Permission, Error>({
    // query key, disesuaikan dengan ID permission untuk caching
    queryKey: ["permission", id],

    // query function
    queryFn: async () => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // ambil permission berdasarkan ID dari API
      const response = await Api.get(`/api/admin/permissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return data
      return response.data.data as Permission;
    },
  });
};
