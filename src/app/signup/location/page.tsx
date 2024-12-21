import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function Location() {
  const { location } = await getUserInfo(["location"]);

  return <Form initialLocation={location} />;
}
