import { getUserInfo } from "@/utils/user";
import LocationForm from "./LocationForm";

export default async function Location() {
  const { location } = await getUserInfo(["location"]);

  return <LocationForm initialLocation={location} />;
}
