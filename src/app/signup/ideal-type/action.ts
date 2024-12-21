import { z } from "zod";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

const schema = z.string().refine((value) => value.trim().length >= 20, {
  message: "최소 20자 이상 적어주세요",
});

export async function updateIdealType(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const idealType = formData.get("ideal_type")?.toString();
  const validate = schema.safeParse(idealType);
  if (!validate.success) {
    return {
      user: { ideal_type: idealType },
      errors: {
        ideal_type: validate.error.flatten().formErrors.join(" / "),
      },
      success: false,
    };
  }

  await updateUser(["ideal_type"], formData);

  moveToNextStepPath(Step.IdealType);
}
