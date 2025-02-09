import { INITIAL_FILTER } from "@/types/filter";
import { getAllUsers } from "@/app/(with-gnb)/admin/action";
import ClientAdminPage from "@/app/(with-gnb)/admin/client";

export default async function AdminPage() {
  const { users } = await getAllUsers(INITIAL_FILTER);

  return <ClientAdminPage initUsers={users} />;
}
