import React from "react";
import ReligionForm from "@/app/signup/religion/ReligionForm";
import { getUserInfo } from "@/utils/user";

export default async function Religion() {
  const { religion } = await getUserInfo(["religion"]);

  return <ReligionForm initialReligion={religion} />;
}
