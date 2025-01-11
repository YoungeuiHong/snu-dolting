"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const updateFCMToken = async (token: string | null) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("users")
    .update({ fcm_token: token })
    .eq("id", user.id);

  if (error) {
    console.error("FCM 토큰 업데이트 오류:", error);
    throw new Error("알림 수신 여부 변경에 실패했습니다");
  }
};

export const getFCMTokenStatus = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("users")
    .select("fcm_token")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    throw new Error("알림 수신 여부 변경에 실패했습니다");
  }

  return data?.fcm_token || null;
};
