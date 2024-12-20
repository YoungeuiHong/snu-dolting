import { getUserInfo } from "@/utils/user";
import NicknameForm from "./NicknameForm";

export default async function NicknamePage() {
  const { nickname } = await getUserInfo(["nickname"]);

  return <NicknameForm initialNickname={nickname} />;
}
