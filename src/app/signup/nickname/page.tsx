import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function NicknamePage() {
  const { nickname, introduction } = await getUserInfo([
    "nickname",
    "introduction",
  ]);

  return <Form initialNickname={nickname} initialIntroduction={introduction} />;
}
