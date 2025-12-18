// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { PostCreateRequest } from "../../../types/post";

// import js-cookie
import Cookies from "js-cookie";

// Custom hook untuk create Post
export const usePostCreate = () => {
  return useMutation({
    // Mutation function untuk create post
    mutationFn: async (data: PostCreateRequest) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image as File);
      }
      formData.append("category_id", data.category_id.toString());
      formData.append("title", data.title);
      formData.append("content", data.content);

      // Kirim request POST ke API
      const response = await Api.post("/api/admin/posts", formData, {
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
