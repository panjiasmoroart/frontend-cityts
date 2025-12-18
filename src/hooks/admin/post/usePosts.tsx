// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import Api service
import Api from "../../../services/api";

// import type PostsResponse
import type { PostsResponse } from "../../../types/post";

// import type Params
import type { Params } from "../../../types/params";

// import js-cookie
import Cookies from "js-cookie";

// hook usePosts dengan return type yang benar
export const usePosts = ({ page, search }: Params) => {
  return useQuery<PostsResponse, Error>({
    // query key yang mencakup parameter untuk caching yang benar
    queryKey: ["posts", page, search],

    // query function
    queryFn: async () => {
      // get token from cookies
      const token = Cookies.get("token");

      // get posts from api
      const response = await Api.get(
        `/api/admin/posts?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // return the entire response data (not just data.data)
      return response.data.data;
    },
  });
};
