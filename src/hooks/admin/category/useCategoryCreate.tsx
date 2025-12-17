// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

//import service API
import Api from "../../../services/api";

//import type Category
import type { CategoryCreateRequest } from "../../../types/category";

// import js-cookie
import Cookies from "js-cookie";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

// custom hook untuk create category
export const useCategoryCreateOld = () => {
  return useMutation({
    // mutation function untuk create category
    mutationFn: async (data: CategoryCreateRequest) => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // kirim request POST ke endpoint pembuatan category
      const response = await Api.post("/api/admin/categories", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // kembalikan data response
      return response.data;
    },
  });
};

export const useCategoryCreate = () => {
  return useMutation<
    unknown, // TData (response success)
    AxiosError<ApiErrorResponse>, // TError (error dari API)
    CategoryCreateRequest // TVariables (payload)
  >({
    // mutation untuk create category
    mutationFn: async (data) => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // kirim request POST ke endpoint pembuatan category
      const response = await Api.post("/api/admin/categories", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // kembalikan data respons
      return response.data;
    },
  });
};
