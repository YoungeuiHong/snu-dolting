import {
  SignUpActionResponse,
  SignUpError,
  updateUser,
} from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";
import { stringToBoolean } from "@/utils/type/converts";

export async function updateChildren(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const hasChildren = formData.get("has_children");

  const errors: SignUpError = {};

  if (hasChildren === null || hasChildren === undefined) {
    errors.has_children = "자녀 유무를 알려주세요";
  }

  if (Object.keys(errors).length > 0) {
    return {
      user: {
        has_children: stringToBoolean(hasChildren?.toString()),
      },
      errors,
      success: false,
    };
  }

  await updateUser(["has_children"], formData);

  moveToNextStepPath(Step.Children);
}
