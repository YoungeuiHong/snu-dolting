import { z } from "zod";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

const schema = z.string().refine((value) => value.trim().length >= 50, {
  message: "최소 50자 이상 적어주세요",
});

export async function updatePersonality(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const personality = formData.get("inner_description")?.toString();
  const validate = schema.safeParse(personality);
  if (!validate.success) {
    return {
      user: { inner_description: personality },
      errors: {
        inner_description: validate.error.flatten().formErrors.join(" / "),
      },
      success: false,
    };
  }

  await updateUser(["inner_description"], formData);

  moveToNextStepPath(Step.Personality);
}
