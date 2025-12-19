// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { PostUpdateRequest } from "../../../types/post";

// import js-cookie
import Cookies from "js-cookie";
import type { ApiErrorResponse } from "../../../types/error-response";
import type { AxiosError } from "axios";

// Custom hook untuk update Post
export const usePostUpdateOld = () => {
  return useMutation({
    // Mutation function untuk update post
    mutationFn: async (data: PostUpdateRequest) => {
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("category_id", data.category_id.toString());
      formData.append("title", data.title);
      formData.append("content", data.content);

      // Kirim request PUT/POST ke endpoint update
      const response = await Api.put(`/api/admin/posts/${data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};

export const usePostUpdate = () => {
  return useMutation<
    unknown, // TData (response success)
    AxiosError<ApiErrorResponse>, // TError (error dari API)
    PostUpdateRequest // TVariables (payload)
  >({
    // Mutation function untuk update post
    mutationFn: async (data) => {
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("category_id", data.category_id.toString());
      formData.append("title", data.title);
      formData.append("content", data.content);

      // Kirim request PUT/POST ke endpoint update
      const response = await Api.put(`/api/admin/posts/${data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};
