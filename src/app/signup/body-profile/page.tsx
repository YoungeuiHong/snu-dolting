import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function BodyProfilePage() {
  const { weight, height } = await getUserInfo(["weight", "height"]);

  return <Form initialWeight={weight} initialHeight={height} />;
}
