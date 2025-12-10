// import hook useQuery dari react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type RolesResponse
import type { RolesResponse } from "../../../types/role";

// import type Params (page & search)
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// Hook useRoles dengan dukungan pagination
export const useRoles = ({ page, search }: Params) => {
  return useQuery<RolesResponse, Error>({
    // query key yang mencakup parameter page dan search
    queryKey: ["roles", page, search],

    // fungsi untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Kirim request ke API endpoint dengan pagination dan pencarian
      const response = await Api.get(
        `/api/admin/roles?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kembalikan data role (sudah dalam format pagination)
      return response.data.data;
    },
  });
};
