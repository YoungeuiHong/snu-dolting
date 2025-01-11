"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export async function getScrapList(): Promise<User[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("scraps")
    .select(
      `
      users!scraps_target_user_id_fkey (*)
    `,
    )
    .eq("user_id", user.id);

  if (error) {
    throw new Error("스크랩 목록 조회에 실패했습니다");
  }

  const users: User[] =
    data?.map((scrap) => scrap.users).filter((user) => user !== null) || [];

  return users;
}
