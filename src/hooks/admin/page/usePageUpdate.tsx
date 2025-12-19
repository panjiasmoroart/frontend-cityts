// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

//import type Page
import type { PageUpdateRequest } from "../../../types/page";

// import js-cookie
import Cookies from "js-cookie";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

// Hook untuk update page
export const usePageUpdateOld = () => {
  return useMutation({
    // Mutation function untuk update page
    mutationFn: async (data: PageUpdateRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Lakukan request PUT ke endpoint API
      const response = await Api.put(`/api/admin/pages/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};

export const usePageUpdate = () => {
  return useMutation<
    unknown, // TData (response success)
    AxiosError<ApiErrorResponse>, // TError (error dari API)
    PageUpdateRequest // TVariables (payload)
  >({
    // mutation untuk update page
    mutationFn: async (data) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Lakukan request PUT ke endpoint API
      const response = await Api.put(`/api/admin/pages/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};
