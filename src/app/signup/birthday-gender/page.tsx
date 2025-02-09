import React from "react";
import { getUserInfo } from "@/utils/user";
import Form from "./form";
import { createClient } from "@/utils/supabase/server";

export default async function BirthdayGender() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { gender, birth_year } = await getUserInfo(["gender", "birth_year"]);

  return (
    <Form
      initialGender={gender}
      initialBirthYear={birth_year}
      isExistingMember={user?.user_metadata?.complete}
    />
  );
}
