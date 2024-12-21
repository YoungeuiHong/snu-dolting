import { z } from "zod";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

const schema = z.string().refine((value) => value.trim().length >= 20, {
  message: "최소 20자 이상 적어주세요",
});

export async function updateDatingStyle(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const datingStyle = formData.get("dating_style")?.toString();
  const validate = schema.safeParse(datingStyle);
  if (!validate.success) {
    return {
      user: { dating_style: datingStyle },
      errors: {
        dating_style: validate.error.flatten().formErrors.join(" / "),
      },
      success: false,
    };
  }

  await updateUser(["dating_style"], formData);

  moveToNextStepPath(Step.Dating);
}
