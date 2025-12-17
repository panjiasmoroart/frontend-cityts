// import useMutation dari '@tanstack/react-query'
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { UserCreateRequest } from "../../../types/user";

// import js-cookie
import Cookies from "js-cookie";

// custom hook untuk create user
export const useUserCreate = () => {
  return useMutation({
    // fungsi untuk mengirim data ke API
    mutationFn: async (data: UserCreateRequest) => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // kirim request POST ke endpoint pembuatan user
      const response = await Api.post("/api/admin/users", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // kembalikan data response
      return response.data;
    },
  });
};
