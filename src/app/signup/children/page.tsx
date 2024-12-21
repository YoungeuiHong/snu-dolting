import React from "react";
import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function ChildrenPage() {
  const { has_children, has_custody, son_count, daughter_count } =
    await getUserInfo([
      "has_children",
      "has_custody",
      "son_count",
      "daughter_count",
    ]);

  return (
    <Form
      initialHasChildren={has_children}
      initialHasCustody={has_custody}
      initialSonCount={son_count}
      initialDaughterCount={daughter_count}
    />
  );
}
