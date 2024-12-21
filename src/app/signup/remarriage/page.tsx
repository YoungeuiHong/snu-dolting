import React from "react";
import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function RemarriagePage() {
  const { remarriage_intent } = await getUserInfo(["remarriage_intent"]);

  return <Form initialRemarriage={remarriage_intent} />;
}
