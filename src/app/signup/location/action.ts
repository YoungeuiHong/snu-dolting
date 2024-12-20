import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

export async function updateLocation(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const location = formData.get("location")?.toString().trim();

  if (!location) {
    return {
      user: { location },
      errors: {
        location: "거주지를 알려주세요",
      },
      success: false,
    };
  }

  await updateUser(["location"], formData);

  moveToNextStepPath(Step.Location);
}
