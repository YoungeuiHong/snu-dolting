import React from "react";
import { getUserInfo } from "@/utils/user";
import BirthdayGenderForm from "./BirthdayGenderForm";

export default async function BirthdayGender() {
  const { gender, birth_year } = await getUserInfo(["gender", "birth_year"]);

  return (
    <BirthdayGenderForm initialGender={gender} initialBirthYear={birth_year} />
  );
}
