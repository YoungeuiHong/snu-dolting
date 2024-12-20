import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

export async function updateReligion(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const religion = formData.get("religion");
  if (!religion) {
    return {
      user: { religion },
      errors: {
        religion: "종교 정보를 알려주세요.",
      },
      success: false,
    };
  }

  updateUser(["religion"], formData);

  moveToNextStepPath(Step.Religion);
}
