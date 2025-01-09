"use server";
import { createClient } from "@/utils/supabase/server";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

export async function uploadProfilePicture(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | void> {
  const profilePicture = formData.get("profile_picture") as string;

  if (!profilePicture) {
    return {
      errors: {
        profile_picture:
          "사진을 업로드해주세요. 얼굴이 나온 사진이 아니어도 괜찮아요.",
      },
      success: false,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  await updateUser(["profile_picture"], formData);
  moveToNextStepPath(Step.Profile);
}
