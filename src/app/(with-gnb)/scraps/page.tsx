import { getScrapList } from "@/app/(with-gnb)/scraps/action";
import { UserCard } from "@/app/(with-gnb)/home/components/UserCard";
import { scrapsContainer } from "@/app/(with-gnb)/scraps/page.css";

export default async function ScrapList() {
  const scraps = await getScrapList();

  return (
    <div className={scrapsContainer}>
      {scraps.map((user) => (
        <UserCard key={user.nickname} user={user} />
      ))}
    </div>
  );
}
