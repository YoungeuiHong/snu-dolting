"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export async function getMyInfo(): Promise<User> {
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
    .select("*")
    .eq("id", user.id)
    .single();

  if (queryError) {
    console.error("프로필 조회 실패: ", queryError.message);
    throw new Error("프로필 조회에 실패했습니다");
  }

  if (!myInfo) {
    throw new Error("프로필 조회에 실패했습니다");
  }

  return myInfo as User;
}
