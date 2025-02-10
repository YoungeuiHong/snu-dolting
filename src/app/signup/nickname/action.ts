"use server";
import { z } from "zod";
import {
  SignUpActionResponse,
  SignUpError,
  updateUser,
} from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const nicknameSchema = z
  .string()
  .max(10, "닉네임 길이는 10글자 이하여야 합니다.")
  .refine((value) => value.trim().length > 0, {
    message: "닉네임은 최소 2글자 이상이어야 합니다.",
  });

const introductionSchema = z
  .string()
  .max(20, "한 줄 소개는 20글자 이하여야 합니다.")
  .refine((value) => value.trim().length > 4, {
    message: "한 줄 소개는 최소 5글자 이상이어야 합니다.",
  });

export async function updateNickname(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const nickname = formData.get("nickname")?.toString();
  const introduction = formData.get("introduction")?.toString();

  const errors: SignUpError = {};

  const validateNickname = nicknameSchema.safeParse(nickname);
  if (!validateNickname.success) {
    errors.nickname = validateNickname.error.flatten().formErrors.join(" / ");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 닉네임 중복 여부 확인
  if (nickname) {
    const { data: existingNickname, error: fetchError } = await supabase
      .from("users")
      .select("nickname")
      .neq("id", user.id)
      .eq("nickname", nickname)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("닉네임 확인 중 에러 발생:", fetchError);
      errors.nickname = "닉네임 중복 확인 중 에러가 발생했습니다.";
    } else if (existingNickname) {
      errors.nickname = "이미 존재하는 닉네임입니다.";
    }
  }

  const validateIntroduction = introductionSchema.safeParse(introduction);
  if (!validateIntroduction.success) {
    errors.introduction = validateIntroduction.error
      .flatten()
      .formErrors.join(" / ");
  }

  if (Object.keys(errors).length > 0) {
    return {
      user: { nickname, introduction },
      errors,
      success: false,
    };
  }

  await updateUser(["nickname", "introduction"], formData);

  moveToNextStepPath(Step.Nickname);
}
