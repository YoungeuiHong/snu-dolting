import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function DatingStylePage() {
  const { ideal_type } = await getUserInfo(["ideal_type"]);

  return <Form initialIdealType={ideal_type} />;
}
