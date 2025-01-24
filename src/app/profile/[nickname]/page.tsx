import {
  getIsScrappedQueryOption,
  getProfileQueryOption,
} from "@/query/profile";
import { getQueryClient } from "@/utils/react-query/getQueryClient";
import { ClientProfilePage } from "./client";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ nickname: string }>;
}) {
  const nickname = (await params).nickname;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getProfileQueryOption(nickname));
  void queryClient.prefetchQuery(getIsScrappedQueryOption(nickname));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientProfilePage nickname={nickname} />
    </HydrationBoundary>
  );
}
