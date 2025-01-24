"use client";
import { NoResult } from "@/components/no-result/NoResult";
import { UserCard } from "../home/components/UserCard";
import { getScrapsQueryOption } from "@/query/scraps";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { scrapsContainer } from "./page.css";

export const ClientScrapPage = () => {
  const { data: scraps } = useQuery(getScrapsQueryOption());

  return (
    <div className={scrapsContainer}>
      {scraps?.length > 0 ? (
        scraps?.map((user: Partial<User>) => (
          <UserCard key={user.nickname} user={user} />
        ))
      ) : (
        <NoResult noResultMessage="내가 스크랩한 상대가 없습니다." />
      )}
    </div>
  );
};
