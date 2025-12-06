// import hook useQuery dari react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type
import type { Permission } from "../../../types/permission";

// import js-cookie
import Cookies from "js-cookie";

// hook usePermissionsAll dengan return type yang benar
export const usePermissionsAll = () => {
  return useQuery<Permission[], Error>({
    // query key untuk caching
    queryKey: ["permissions-all"],

    // query function
    queryFn: async () => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // kirim request GET ke endpoint API
      const response = await Api.get("/api/admin/permissions/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // kembalikan data dari response API
      return response.data.data;
    },
  });
};
