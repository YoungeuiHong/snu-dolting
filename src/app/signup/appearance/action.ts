import { z } from "zod";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

const appearanceSchema = z
  .string()
  .refine((value) => value.trim().length >= 20, {
    message: "최소 20자 이상 적어주세요",
  });

export async function updateAppearance(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const appearance = formData.get("appearance_description")?.toString();
  const validate = appearanceSchema.safeParse(appearance);
  if (!validate.success) {
    return {
      user: { appearance_description: appearance },
      errors: {
        appearance_description: validate.error.flatten().formErrors.join(" / "),
      },
      success: false,
    };
  }

  await updateUser(["appearance_description"], formData);

  moveToNextStepPath(Step.Appearance);
}
