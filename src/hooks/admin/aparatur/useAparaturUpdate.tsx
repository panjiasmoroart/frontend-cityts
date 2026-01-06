// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { AparaturUpdateRequest } from "../../../types/aparatur";

// import js-cookie
import Cookies from "js-cookie";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

// Custom hook untuk update Aparatur
export const useAparaturUpdateOld = () => {
  return useMutation({
    // Mutation function untuk update aparatur
    mutationFn: async (data: AparaturUpdateRequest) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("description", data.description);

      // Kirim request PUT ke endpoint update aparatur
      const response = await Api.put(
        `/api/admin/aparaturs/${data.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
  });
};

export const useAparaturUpdate = () => {
  return useMutation<
    unknown, // TData (response success)
    AxiosError<ApiErrorResponse>, // TError (error dari API)
    AparaturUpdateRequest // TVariables (payload)
  >({
    // Mutation function untuk update aparatur
    mutationFn: async (data) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("description", data.description);

      // Kirim request PUT ke endpoint update aparatur
      const response = await Api.put(
        `/api/admin/aparaturs/${data.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
  });
};
