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
  const hasCustody = formData.get("has_custody");

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

  if (!Boolean(hasChildren)) {
    formData.set("has_custody", "null");
    formData.set("son_count", "null");
    formData.set("daughter_count", "null");
    await updateUser(
      ["has_children", "has_custody", "son_count", "daughter_count"],
      formData,
    );
    moveToNextStepPath(Step.Children);
    return;
  }

  if (hasCustody === null || hasCustody === undefined) {
    errors.has_custody = "자녀 양육 여부를 알려주세요";
  }

  if (Object.keys(errors).length > 0) {
    return {
      user: {
        has_children: true,
        has_custody: stringToBoolean(hasCustody?.toString()),
      },
      errors,
      success: false,
    };
  }

  await updateUser(
    ["has_children", "has_custody", "son_count", "daughter_count"],
    formData,
  );

  moveToNextStepPath(Step.Children);
}
