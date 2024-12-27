import ClientMainPage from "@/app/main/client";
import { getUsers } from "@/app/main/action";
import { INITIAL_FILTER } from "@/types/filter";

export default async function MainPage() {
  const { users } = await getUsers(INITIAL_FILTER);

  return <ClientMainPage initUsers={users} />;
}
