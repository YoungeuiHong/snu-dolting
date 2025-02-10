import React from "react";
import { getUserInfo } from "@/utils/user";
import Form from "@/app/signup/mbti/form";

export default async function MbtiPage() {
  const { mbti } = await getUserInfo(["mbti"]);

  return <Form initialMbti={mbti} />;
}
