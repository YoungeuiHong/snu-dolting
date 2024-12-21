import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function DatingStylePage() {
  const { dating_style } = await getUserInfo(["dating_style"]);

  return <Form initialDatingStyle={dating_style} />;
}
