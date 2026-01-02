// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

//import type Photo
import type { PhotoCreateRequest } from "../../../types/photo";

// import js-cookie
import Cookies from "js-cookie";

// Custom hook untuk create Photo
export const usePhotoCreate = () => {
  return useMutation({
    // Mutation function untuk create photo
    mutationFn: async (data: PhotoCreateRequest) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("caption", data.caption);
      formData.append("description", data.description);

      // Kirim request POST ke API
      const response = await Api.post("/api/admin/photos", formData, {
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
