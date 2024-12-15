import { z } from "zod";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";

const birthYearSchema = z
  .number()
  .refine((value) => value >= 1000 && value <= 9999, {
    message: "출생년도는 4자리 숫자여야 합니다.",
  });

export async function updateBirthdayGender(
  prevState: Awaited<SignUpActionResponse>,
  formData: FormData,
): Promise<SignUpActionResponse> {
  const gender = formData.get("gender");
  const birthYear = Number(formData.get("birth_year"));

  const errors: Record<string, string> = {};

  if (!gender) {
    errors.gender = "성별 정보를 알려주세요.";
  }
  const validateBirthyear = birthYearSchema.safeParse(birthYear);

  if (!validateBirthyear.success) {
    errors.birthYear = validateBirthyear.error.flatten().formErrors.join(" / ");
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  return updateUser(["birth_year", "gender"], formData);
}
