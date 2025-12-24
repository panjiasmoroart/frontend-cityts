// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { ProductCreateRequest } from "../../../types/product";

// import js-cookie
import Cookies from "js-cookie";
import type { ApiErrorResponse } from "../../../types/error-response";
import type { AxiosError } from "axios";

// Custom hook untuk create Product
export const useProductCreateOld = () => {
  return useMutation({
    // Mutation function untuk create product
    mutationFn: async (data: ProductCreateRequest) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image as File);
      }
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("owner", data.owner);
      formData.append("price", data.price.toString());
      formData.append("phone", data.phone);
      formData.append("address", data.address);

      // Kirim request POST ke API
      const response = await Api.post("/api/admin/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};

export const useProductCreate = () => {
  return useMutation<
    unknown, // TData (response success)
    AxiosError<ApiErrorResponse>, // TError (error dari API)
    ProductCreateRequest // TVariables (payload)
  >({
    // mutation untuk create product
    mutationFn: async (data) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image as File);
      }
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("owner", data.owner);
      formData.append("price", data.price.toString());
      formData.append("phone", data.phone);
      formData.append("address", data.address);

      // Kirim request POST ke API
      const response = await Api.post("/api/admin/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};
