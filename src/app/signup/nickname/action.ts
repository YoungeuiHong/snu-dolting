import { z } from "zod";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";

const nicknameSchema = z
  .string()
  .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
  .max(15, "닉네임 길이는 15글자 이하여야 합니다.");

export async function updateNickname(
  prevState: Awaited<SignUpActionResponse>,
  formData: FormData,
): Promise<SignUpActionResponse> {
  const validateNickname = nicknameSchema.safeParse(formData.get("nickname"));
  if (!validateNickname.success) {
    return {
      errors: {
        nickname: validateNickname.error.flatten().formErrors.join(" / "),
      },
      success: false,
    };
  }

  return updateUser(["nickname"], formData);
}
