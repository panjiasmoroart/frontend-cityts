// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

//import type Permission
import type { PermissionUpdateRequest } from "../../../types/permission";

// import js-cookie
import Cookies from "js-cookie";
import type { ApiErrorResponse } from "../../../types/error-response";
import type { AxiosError } from "axios";

export const usePermissionUpdate = () => {
  return useMutation<
    unknown, // TData (response success)
    AxiosError<ApiErrorResponse>, // TError (error dari API)
    PermissionUpdateRequest // TVariables (payload)
  >({
    // mutation untuk create permission
    mutationFn: async (data) => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // Kirim request update ke API
      const response = await Api.put(
        `/api/admin/permissions/${data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
  });
};

// Hook untuk update permission old
export const usePermissionUpdateOld = () => {
  return useMutation({
    // Mutation function untuk update permission
    mutationFn: async (data: PermissionUpdateRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Kirim request update ke API
      const response = await Api.put(
        `/api/admin/permissions/${data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kembalikan data response
      return response.data;
    },
  });
};
