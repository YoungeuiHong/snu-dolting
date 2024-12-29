"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";

export async function getScrapList(): Promise<User[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  const { data, error } = await supabase
    .from("scraps")
    .select(
      `
      users!scraps_target_user_id_fkey (*)
    `,
    )
    .eq("user_id", user.id);

  if (error) throw error;

  const users: User[] =
    data?.map((scrap) => scrap.users).filter((user) => user !== null) || [];

  return users;
}
