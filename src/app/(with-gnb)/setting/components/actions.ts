"use server";
import { createClient } from "@/utils/supabase/server";

export const updateFCMToken = async (token: string | null) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("사용자 인증 정보 가져오기 오류:", userError);
    throw new Error("사용자 인증 정보를 가져올 수 없습니다.");
  }

  const { error } = await supabase
    .from("users")
    .update({ fcm_token: token })
    .eq("id", user.id);

  if (error) {
    console.error("FCM 토큰 업데이트 오류:", error);
    throw new Error("FCM 토큰 업데이트 중 오류 발생");
  }
};

export const getFCMTokenStatus = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("사용자 인증 정보 가져오기 오류:", userError);
    throw new Error("사용자 인증 정보를 가져올 수 없습니다.");
  }

  const { data, error } = await supabase
    .from("users")
    .select("fcm_token")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    throw new Error("사용자 정보 가져오기 중 오류 발생");
  }

  return data?.fcm_token || null;
};
