import { fetchByEnv } from "@/utils/fetch";
import { queryOptions } from "@tanstack/react-query";

export const getProfileQueryOption = (nickname: string) => {
  return queryOptions({
    queryKey: ["profile", decodeURIComponent(nickname)],
    queryFn: async () => {
      const response = await fetchByEnv(`/api/profile?nickname=${nickname}`);
      return response.json();
    },
  });
};

export const getIsScrappedQueryOption = (nickname: string) => {
  return queryOptions({
    queryKey: ["isScrapped", decodeURIComponent(nickname)],
    queryFn: async () => {
      const response = await fetchByEnv(`/api/scrap?nickname=${nickname}`);
      return response.json();
    },
  });
};
