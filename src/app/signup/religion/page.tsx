import React from "react";
import Form from "@/app/signup/religion/form";
import { getUserInfo } from "@/utils/user";

export default async function Religion() {
  const { religion } = await getUserInfo(["religion"]);

  return <Form initialReligion={religion} />;
}
