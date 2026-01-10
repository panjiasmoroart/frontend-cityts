// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import type Post
import type { Post } from "../../../types/post";

// import Api service
import Api from "../../../services/api";

// --- Hook React Query
export const usePostsHome = () => {
  return useQuery<Post[]>({
    // query key unik untuk caching berdasarkan parameter
    queryKey: ["web-posts-home"],

    // query function
    queryFn: async () => {
      // Request GET ke endpoint API
      const response = await Api.get(`/api/public/posts_home`);

      // Kembalikan data dari response
      return response.data.data as Post[];
    },
  });
};
