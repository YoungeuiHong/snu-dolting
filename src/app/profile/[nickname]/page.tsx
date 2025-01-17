import {
  getIsScrapped,
  getUserByNickname,
} from "@/app/profile/[nickname]/action";
import { PrevHeader } from "@/components/header";
import { ActionBar } from "@/app/profile/[nickname]/components/ActionBar";
import { ProfileInfo } from "@/app/profile/components/ProfileInfo";

export default async function Page({
  params,
}: {
  params: Promise<{ nickname: string }>;
}) {
  const nickname = decodeURIComponent((await params).nickname);
  const user = await getUserByNickname(nickname);
  const isScrapped = await getIsScrapped(nickname);

  return (
    <>
      <PrevHeader />
      <ProfileInfo user={user} />;
      <ActionBar
        isScrapped={isScrapped || false}
        targetUserId={user.id}
        targetNickname={user.nickname || ""}
      />
    </>
  );
}
