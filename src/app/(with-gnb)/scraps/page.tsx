import { getScrapsQueryOption } from "@/query/scraps";
import { getQueryClient } from "@/utils/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ClientScrapPage } from "./client";

export const dynamic = "force-dynamic";

export default async function ScrapList() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getScrapsQueryOption());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientScrapPage />
    </HydrationBoundary>
  );
}
