import { User } from "@/types/user";
import { NoResult } from "@/components/no-result/NoResult";
import { MainLoading } from "./MainLoading";
import { UserCard } from "./UserCard";

interface Props {
  isLoading: boolean;
  users: Partial<User>[];
}

export const UserResults = ({ isLoading, users }: Props) => {
  if (isLoading) {
    return <MainLoading />;
  }

  if (users.length === 0) {
    return <NoResult noResultMessage="사용자가 없습니다." />;
  }

  return (
    <>
      {users.map((user: Partial<User>) => (
        <UserCard key={user.nickname} user={user} />
      ))}
    </>
  );
};
