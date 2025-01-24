import { UserFilters } from "@/types/filter";
import { fetchByEnv } from "@/utils/fetch";
import { queryOptions } from "@tanstack/react-query";

export const getUsersQueryOption = (filters: UserFilters) =>
  queryOptions({
    queryKey: ["users", filters],
    queryFn: async () => {
      const response = await fetchByEnv("/api/users", {
        method: "POST",
        body: JSON.stringify(filters),
      });
      return response.json();
    },
  });
