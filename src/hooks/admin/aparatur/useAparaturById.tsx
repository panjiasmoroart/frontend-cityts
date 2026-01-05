// import hook useQuery dari react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type
import type { Aparatur } from "../../../types/aparatur";

// import js-cookie
import Cookies from "js-cookie";

// hook useAparaturById dengan parameter id dan return type Aparatur
export const useAparaturById = (id: number) => {
  return useQuery<Aparatur, Error>({
    // query key untuk caching berdasarkan ID aparatur
    queryKey: ["aparatur", id],

    // query function
    queryFn: async () => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // ambil data aparatur dari API berdasarkan ID
      const response = await Api.get(`/api/admin/aparaturs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return data aparatur
      return response.data.data as Aparatur;
    },
  });
};
