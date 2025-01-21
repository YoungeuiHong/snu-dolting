import { getScrapList } from "@/app/(with-gnb)/scraps/action";
import { UserCard } from "@/app/(with-gnb)/home/components/UserCard";
import { scrapsContainer } from "@/app/(with-gnb)/scraps/page.css";
import { NoResult } from "@/components/no-result/NoResult";

export default async function ScrapList() {
  const scraps = await getScrapList();

  return (
    <div className={scrapsContainer}>
      {scraps.length > 0 ? (
        scraps.map((user) => <UserCard key={user.nickname} user={user} />)
      ) : (
        <NoResult noResultMessage="내가 스크랩한 상대가 없습니다." />
      )}
    </div>
  );
}
