'use client';
import { PrevHeader } from "@/components/header/PrevHeader";
import { ActionBar } from "./components/ActionBar";
import { ProfileInfo } from "../components/ProfileInfo";
import { getIsScrappedQueryOption } from "@/query/profile";
import { getProfileQueryOption } from "@/query/profile";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";

interface ClientProfilePageProps {
  nickname: string;
}

export const ClientProfilePage = ({ nickname }: ClientProfilePageProps) => {
  const { data: user, isLoading: userLoading } = useQuery(getProfileQueryOption(nickname));
  const { data: scrap, isLoading: scrapLoading } = useQuery(getIsScrappedQueryOption(nickname));

  if (userLoading || scrapLoading) {
    return <Loading />;
  }

  return (
    <>
      <PrevHeader />
      <ProfileInfo user={user} />;
      <ActionBar
        isScrapped={scrap?.isScrapped || false}
        targetNickname={user?.nickname || ""}
      />
    </>
  );
};
