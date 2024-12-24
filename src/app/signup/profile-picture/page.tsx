import { getUserInfo } from "@/utils/user";
import Form from "@/app/signup/profile-picture/form";

export default async function ProfilePicturePage() {
  const { profile_picture } = await getUserInfo(["profile_picture"]);

  return <Form initialPicture={profile_picture} />;
}
