import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function NicknamePage() {
  const { appearance_description } = await getUserInfo([
    "appearance_description",
  ]);

  return <Form initialAppearance={appearance_description} />;
}
