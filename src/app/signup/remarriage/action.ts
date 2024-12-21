import {
  SignUpActionResponse,
  SignUpError,
  updateUser,
} from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";
import { stringToBoolean } from "@/utils/type/converts";

export async function updateRemarriage(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const remarriage = formData.get("remarriage_intent");

  const errors: SignUpError = {};

  if (remarriage === null || remarriage === undefined) {
    errors.remarriage_intent = "재혼 의향을 알려주세요.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      user: {
        remarriage_intent: stringToBoolean(remarriage?.toString()),
      },
      errors,
      success: false,
    };
  }

  await updateUser(["remarriage_intent"], formData);

  moveToNextStepPath(Step.Remarriage);
}
