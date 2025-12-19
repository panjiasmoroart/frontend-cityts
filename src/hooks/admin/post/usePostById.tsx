// import hook useQuery dari react-query
import { useQuery } from "@tanstack/react-query";

// import service Api
import Api from "../../../services/api";

// import type Post
import type { Post } from "../../../types/post";

// import js-cookie
import Cookies from "js-cookie";

// hook usePostById dengan parameter id dan return type Post
export const usePostById = (id: number) => {
  return useQuery<Post, Error>({
    // query key untuk caching berdasarkan ID post
    queryKey: ["post", id],

    // query function
    queryFn: async () => {
      // ambil token dari cookies
      const token = Cookies.get("token");

      // ambil data post dari API berdasarkan ID
      const response = await Api.get(`/api/admin/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return data post
      return response.data.data as Post;
    },
  });
};
