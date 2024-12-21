import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function PersonalityPage() {
  const { inner_description } = await getUserInfo(["inner_description"]);

  return <Form initialPersonality={inner_description} />;
}
