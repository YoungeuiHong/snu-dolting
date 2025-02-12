"use server";
import {
  SignUpActionResponse,
  SignUpError,
  updateUser,
} from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";
import { stringToBoolean } from "@/utils/type/converts";
import { createClient } from "@/utils/supabase/server";

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

  formData.set("is_profile_complete", "TRUE");

  await updateUser(["has_children", "is_profile_complete"], formData);

  const supabase = await createClient();

  await supabase.auth.updateUser({
    data: {
      complete: true,
    },
  });

  moveToNextStepPath(Step.Children);
}
