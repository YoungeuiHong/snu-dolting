import React from "react";
import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function ChildrenPage() {
  const { has_children } = await getUserInfo(["has_children"]);

  return <Form initialHasChildren={has_children} />;
}
