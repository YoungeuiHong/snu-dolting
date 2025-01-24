import ClientMainPage from "@/app/(with-gnb)/home/client";
import { getUsersQueryOption } from "@/query/users";
import { INITIAL_FILTER } from "@/types/filter";
import { getQueryClient } from "@/utils/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic"; 

export default async function MainPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getUsersQueryOption(INITIAL_FILTER));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientMainPage />
    </HydrationBoundary>
  );
}
