// import useMutation dari '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";

// import service API
import Api from "../../../services/api";

// import type
import type { AparaturCreateRequest } from "../../../types/aparatur";

// import js-cookie
import Cookies from "js-cookie";

// Custom hook untuk create Aparatur
export const useAparaturCreate = () => {
  return useMutation({
    // Mutation function untuk create aparatur
    mutationFn: async (data: AparaturCreateRequest) => {
      // Ambil token dari cookie
      const token = Cookies.get("token");

      // Buat FormData
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image as File);
      }
      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("description", data.description);

      // Kirim request POST ke API
      const response = await Api.post("/api/admin/aparaturs", formData, {
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
