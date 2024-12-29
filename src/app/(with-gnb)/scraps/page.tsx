import { getScrapList } from "@/app/(with-gnb)/scraps/action";
import { UserCard } from "@/app/main/components/UserCard";
import { container } from "@/app/(with-gnb)/scraps/page.css";

export default async function ScrapList() {
  const scraps = await getScrapList();

  return (
    <div className={container} style={{ padding: "20px" }}>
      {scraps.map((user) => (
        <UserCard key={user.nickname} user={user} />
      ))}
    </div>
  );
}
