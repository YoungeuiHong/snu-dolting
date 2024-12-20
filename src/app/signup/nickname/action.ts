import { z } from "zod";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

const nicknameSchema = z
  .string()
  .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
  .max(15, "닉네임 길이는 15글자 이하여야 합니다.")
  .refine((value) => value.trim().length > 0, {
    message: "닉네임은 최소 2글자 이상이어야 합니다.",
  });

export async function updateNickname(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const nickname = formData.get("nickname")?.toString();
  const validateNickname = nicknameSchema.safeParse(nickname);
  if (!validateNickname.success) {
    return {
      user: { nickname },
      errors: {
        nickname: validateNickname.error.flatten().formErrors.join(" / "),
      },
      success: false,
    };
  }

  await updateUser(["nickname"], formData);

  moveToNextStepPath(Step.Nickname);
}
