import { z } from "zod";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

const birthYearSchema = z
  .number({ required_error: "출생년도를 입력해주세요." })
  .refine((value) => value >= 1000 && value <= 9999, {
    message: "출생년도는 4자리 숫자여야 합니다.",
  });

export async function updateBirthdayGender(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const gender = formData.get("gender");
  const birthYear = formData.get("birth_year")
    ? Number(formData.get("birth_year"))
    : undefined;

  const errors: Record<string, string> = {};

  if (!gender) {
    errors.gender = "성별 정보를 알려주세요.";
  }
  const validateBirthyear = birthYearSchema.safeParse(birthYear);

  if (!validateBirthyear.success) {
    errors.birthYear = validateBirthyear.error.flatten().formErrors.join(" / ");
  }

  if (Object.keys(errors).length > 0) {
    return {
      user: { gender: gender?.toString(), birth_year: birthYear },
      errors,
      success: false,
    };
  }

  await updateUser(["birth_year", "gender"], formData);

  moveToNextStepPath(Step.BirthdayGender);
}
