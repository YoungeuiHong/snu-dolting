import { PrevHeader } from "@/components/header";
import { getMyInfo } from "@/app/profile/my/action";
import { ProfileInfo } from "@/app/profile/components/ProfileInfo";

export default async function Page() {
  const user = await getMyInfo();

  return (
    <>
      <PrevHeader href="/setting" />
      <ProfileInfo user={user} />
    </>
  );
}
