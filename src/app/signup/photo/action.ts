import {
  SignUpActionResponse,
  SignUpError,
  updateUser,
} from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";
import { stringToBoolean } from "@/utils/type/converts";

export async function updatePhotoExchange(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const intent = formData.get("photo_exchange_intent");

  const errors: SignUpError = {};

  if (intent === null || intent === undefined) {
    errors.photo_exchange_intent = "사진 교환 희망 여부를 알려주세요.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      user: {
        photo_exchange_intent: stringToBoolean(intent?.toString()),
      },
      errors,
      success: false,
    };
  }

  formData.set("is_profile_complete", "TRUE");

  await updateUser(["photo_exchange_intent", "is_profile_complete"], formData);

  moveToNextStepPath(Step.Photo);
}
