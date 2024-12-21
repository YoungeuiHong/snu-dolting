import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

export async function updateBodyProfile(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const height = formData.get("height");
  const weight = formData.get("weight");

  const errors: Record<string, string> = {};

  if (!height) {
    errors.height = "키를 알려주세요.";
  }

  if (!weight) {
    errors.weight = "몸무게를 알려주세요.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      user: {
        height: height ? Number(height) : null,
        weight: weight ? Number(weight) : null,
      },
      errors,
      success: false,
    };
  }

  await updateUser(["weight", "height"], formData);

  moveToNextStepPath(Step.Body);
}
