import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function NicknamePage() {
  const { nickname } = await getUserInfo(["nickname"]);

  return <Form initialNickname={nickname} />;
}
