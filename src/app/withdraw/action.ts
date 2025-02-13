"use server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const withdraw = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user?.id || error) {
    console.error("사용자 탈퇴 실패: ", user?.id, error?.message);
    throw new Error("탈퇴에 실패했습니다");
  }

  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const newNickname = `탈퇴한 사용자 ${randomSuffix}`;

  const { error: withdrawalError } = await supabase
    .from("users")
    .update({
      nickname: newNickname,
      profile_picture:
        "https://yoaeoftmjizxtuvyfymq.supabase.co/storage/v1/object/public/profiles/public/fallback.webp",
      has_custody: true, // 임시로 has_custody를 탈퇴 여부 컬럼으로 사용
      gender: null,
      introduction: null,
      birth_year: null,
      has_children: null,
      height: null,
      weight: null,
      job: null,
      religion: null,
      location: null,
      is_profile_complete: null,
      mbti: null,
      ideal_type: null,
      inner_description: null,
      is_snu_graduate: null,
      photo_exchange_intent: null,
      remarriage_intent: null,
    })
    .eq("id", user.id);

  if (withdrawalError) {
    console.error("회원 탈퇴 처리 중 오류 발생:", withdrawalError);
    throw new Error("탈퇴에 실패했습니다");
  }

  const { error: logoutError } = await supabase.auth.signOut();

  if (logoutError) {
    throw Error("로그아웃에 실패했습니다.");
  }

  (await cookies()).delete("userId");
};
