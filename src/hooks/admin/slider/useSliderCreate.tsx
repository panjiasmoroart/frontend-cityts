// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { SliderCreateRequest } from "../../../types/slider";

// import js-cookie
import Cookies from "js-cookie";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

// Custom hook untuk create Slider
export const useSliderCreateOld = () => {
  return useMutation({
    // Mutation function untuk create slider
    mutationFn: async (data: SliderCreateRequest) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("description", data.description);

      // Kirim request POST ke API
      const response = await Api.post("/api/admin/sliders", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Kembalikan data dari response
      return response.data;
    },
  });
};

export const useSliderCreate = () => {
  return useMutation<
    unknown, // TData (response success)
    AxiosError<ApiErrorResponse>, // TError (error dari API)
    SliderCreateRequest // TVariables (payload)
  >({
    // mutation untuk create slider
    mutationFn: async (data) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("description", data.description);

      // Kirim request POST ke API
      const response = await Api.post("/api/admin/sliders", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Kembalikan data dari response
      return response.data;
    },
  });
};
