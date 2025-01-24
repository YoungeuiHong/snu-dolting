import { fetchByEnv } from "@/utils/fetch";
import { queryOptions } from "@tanstack/react-query";

export const getScrapsQueryOption = () => {
  return queryOptions({
    queryKey: ["scraps"],
    queryFn: async () => {
      const response = await fetchByEnv("/api/scraps");
      return response.json();
    },
  });
};
