// import hook useQuery dari @tanstack/react-query
import { useQuery } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { Role } from "../../../types/role";

// import js-cookie
import Cookies from "js-cookie";

// hook useRoleById untuk mengambil data role berdasarkan ID
export const useRoleById = (id: number) => {
  return useQuery<Role, Error>({
    // query key untuk caching berdasarkan ID
    queryKey: ["role", id],

    // query function
    queryFn: async () => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // request data role berdasarkan ID dari API
      const response = await Api.get(`/api/admin/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return data role, termasuk relasi permissions
      return response.data.data as Role;
    },
  });
};
