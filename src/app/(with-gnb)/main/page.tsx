import ClientMainPage from "@/app/(with-gnb)/main/client";
import { getUsers } from "@/app/(with-gnb)/main/action";
import { INITIAL_FILTER } from "@/types/filter";

export default async function MainPage() {
  const { users } = await getUsers(INITIAL_FILTER);

  return <ClientMainPage initUsers={users} />;
}
