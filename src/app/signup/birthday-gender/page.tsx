import React from "react";
import { getUserInfo } from "@/utils/user";
import Form from "./form";

export default async function BirthdayGender() {
  const { gender, birth_year } = await getUserInfo(["gender", "birth_year"]);

  return <Form initialGender={gender} initialBirthYear={birth_year} />;
}
