import { getScrapList } from "@/app/(with-gnb)/scraps/action";
import { UserCard } from "@/app/(with-gnb)/main/components/UserCard";

export default async function ScrapList() {
  const scraps = await getScrapList();

  return (
    <>
      {scraps.map((user) => (
        <UserCard key={user.nickname} user={user} />
      ))}
    </>
  );
}
