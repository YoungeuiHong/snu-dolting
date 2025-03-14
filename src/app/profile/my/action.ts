"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export async function getMyInfo(): Promise<Partial<User>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || !user.email) {
    redirect("/login");
  }

  const { data: myInfo, error: queryError } = await supabase
    .from("users")
    .select(
      "birth_year, has_children, height, ideal_type, inner_description, introduction, is_snu_graduate, job, location, nickname, photo_exchange_intent, profile_picture, religion, remarriage_intent, weight, mbti",
    )
    .eq("id", user.id)
    .single();

  if (queryError) {
    console.error("프로필 조회 실패: ", queryError.message);
    throw new Error("프로필 조회에 실패했습니다");
  }

  if (!myInfo) {
    throw new Error("프로필 조회에 실패했습니다");
  }

  return myInfo;
}
