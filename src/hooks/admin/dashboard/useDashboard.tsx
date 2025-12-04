// import useQuery dari React Query
import { useQuery } from "@tanstack/react-query";

// import Api service
import Api from "../../../services/api";

// import type
import type { DashboardResponse } from "../../../types/dashboard";

// import js-cookie
import Cookies from "js-cookie";

// --- Hook React Query
export const useDashboard = () => {
  return useQuery<DashboardResponse>({
    // query key yang mencakup parameter untuk caching yang benar
    queryKey: ["dashboard"],

    // query function
    queryFn: async () => {
      // get token from cookies
      const token = Cookies.get("token");

      // get dashboard from api
      const response = await Api.get(`/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return the entire response data
      return response.data.data;
    },
  });
};
