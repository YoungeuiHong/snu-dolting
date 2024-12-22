import { z } from "zod";
import {
  SignUpActionResponse,
  SignUpError,
  updateUser,
} from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

const nicknameSchema = z
  .string()
  .max(10, "닉네임 길이는 10글자 이하여야 합니다.")
  .refine((value) => value.trim().length > 0, {
    message: "닉네임은 최소 2글자 이상이어야 합니다.",
  });

const introductionSchema = z
  .string()
  .max(20, "한 줄 소개는 20글자 이하여야 합니다.")
  .refine((value) => value.trim().length > 0, {
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
