import {
  SignUpActionResponse,
  SignUpError,
  updateUser,
} from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

export async function updateJobAndGraduate(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const job = formData.get("job")?.toString();
  const graduate = formData.get("is_snu_graduate");

  const errors: SignUpError = {};

  if (!job) {
    errors.job = "직업 정보를 알려주세요.";
  }

  if (graduate === null || graduate === undefined) {
    errors.is_snu_graduate = "본교 졸업 여부를 알려주세요";
  }

  if (Object.keys(errors).length > 0) {
    return {
      user: {
        job,
        is_snu_graduate:
          graduate === null || graduate === undefined
            ? null
            : Boolean(graduate),
      },
      errors,
      success: false,
    };
  }

  await updateUser(["job", "is_snu_graduate"], formData);

  moveToNextStepPath(Step.JobGraduate);
}
