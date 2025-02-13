"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function hasUnreadMessages() {
  const supabase = await createClient();

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return false;
  }

  // messages 테이블에서 receiver_id가 현재 유저의 id와 같고 is_read가 false인 데이터가 있는지 확인
  const { data, error } = await supabase
    .from("messages")
    .select("id")
    .eq("receiver_id", userId)
    .eq("is_read", false)
    .limit(1);

  if (error) {
    return false;
  }

  return data?.length > 0;
}
