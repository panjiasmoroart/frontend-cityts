// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { ProductUpdateRequest } from "../../../types/product";

// import js-cookie
import Cookies from "js-cookie";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

// Custom hook untuk update product
export const useProductUpdateOld = () => {
  return useMutation({
    // Fungsi untuk update product
    mutationFn: async (data: ProductUpdateRequest) => {
      const token = Cookies.get("token");

      // Siapkan form data
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("owner", data.owner);
      formData.append("price", data.price.toString());
      formData.append("phone", data.phone);
      formData.append("address", data.address);

      // Kirim request update ke API
      const response = await Api.put(
        `/api/admin/products/${data.id}`,
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

export const useProductUpdate = () => {
  return useMutation<
    unknown, // TData (response success)
    AxiosError<ApiErrorResponse>, // TError (error dari API)
    ProductUpdateRequest // TVariables (payload)
  >({
    // Fungsi untuk update product
    mutationFn: async (data) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Siapkan form data
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("owner", data.owner);
      formData.append("price", data.price.toString());
      formData.append("phone", data.phone);
      formData.append("address", data.address);

      // Kirim request update ke API
      const response = await Api.put(
        `/api/admin/products/${data.id}`,
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
