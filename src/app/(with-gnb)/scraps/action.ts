"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export async function getScrapList(): Promise<Partial<User>[]> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    redirect("/login");
  }

  const { data: scrapsData, error: scrapsError } = await supabase
    .from("scraps")
    .select(
      `
      users!scraps_target_user_id_fkey (
        nickname, profile_picture, birth_year, has_children,
        height, weight, job, religion, location, introduction
      )
    `,
    )
    .eq("user_id", user.id);

  if (scrapsError) {
    console.error("스크랩 목록 조회 실패:", scrapsError.message);
    throw new Error("스크랩 목록 조회에 실패했습니다.");
  }

  const users: Partial<User>[] =
    scrapsData?.map((scrap) => scrap.users).filter((user) => !!user) || [];

  return users;
}
