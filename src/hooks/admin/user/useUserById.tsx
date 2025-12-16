// import hook useQuery dari @tanstack/react-query
import { useQuery } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { User } from "../../../types/user";

// import js-cookie
import Cookies from "js-cookie";

// hook useUserById untuk mengambil data user berdasarkan ID
export const useUserById = (id: number) => {
  return useQuery<User, Error>({
    // query key untuk caching berdasarkan ID
    queryKey: ["user", id],

    // query function
    queryFn: async () => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // request data user berdasarkan ID dari API
      const response = await Api.get(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return data user, termasuk relasi roles
      return response.data.data as User;
    },
  });
};
