// import hook useQuery dari react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type PermissionsResponse
import type { PermissionsResponse } from "../../../types/permission";

// import type Params (page & search)
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// Hook usePermissions dengan return type dan parameter pagination
export const usePermissions = ({ page, search }: Params) => {
  return useQuery<PermissionsResponse, Error>({
    // query key yang mencakup parameter page dan search
    queryKey: ["permissions", page, search],

    // fungsi untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Kirim request ke API endpoint dengan pagination dan pencarian
      const response = await Api.get(
        `/api/admin/permissions?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kembalikan data permission (sudah dalam format pagination)
      return response.data.data;
    },
  });
};
