// import hook useQuery dari react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type User
import type { UsersResponse } from "../../../types/user";

// import type
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// Hook useUsers dengan dukungan pagination
export const useUsers = ({ page, search }: Params) => {
  return useQuery<UsersResponse, Error>({
    // query key yang mencakup parameter page dan search
    queryKey: ["users", page, search],

    // fungsi untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Kirim request ke API endpoint dengan pagination dan pencarian
      const response = await Api.get(
        `/api/admin/users?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kembalikan data user (sudah dalam format pagination)
      return response.data.data;
    },
  });
};
