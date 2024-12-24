"use server";
import { createClient } from "@/utils/supabase/server";
import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

export async function uploadProfilePicture(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | void> {
  const file = formData.get("profile_picture") as File;

  if (!file || !file.size) {
    if (!prevState?.user?.profile_picture) {
      return {
        errors: {
          profile_picture:
            "사진을 업로드해주세요. 얼굴이 나온 사진이 아니어도 괜찮아요.",
        },
        success: false,
      };
    } else {
      moveToNextStepPath(Step.Profile);
    }
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  const { data, error } = await supabase.storage
    .from("profiles")
    .upload(`public/${user.id}/${Date.now()}`, file, {
      contentType: file.type,
    });

  if (error) {
    throw new Error(`사진 업로드 실패: ${error.message}`);
  }

  const filePath = data?.path;
  if (!filePath) {
    throw new Error("파일 경로를 가져올 수 없습니다.");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("profiles").getPublicUrl(filePath);

  if (!publicUrl) {
    throw new Error("Public URL 생성 실패");
  }

  formData.set("profile_picture", publicUrl);

  await updateUser(["profile_picture"], formData);

  moveToNextStepPath(Step.Profile);
}
