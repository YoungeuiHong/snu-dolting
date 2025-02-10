import { SignUpActionResponse, updateUser } from "@/app/signup/actions";
import { moveToNextStepPath, Step } from "@/app/signup/utils/steps";

export async function updateMbti(
  prevState: Awaited<SignUpActionResponse | undefined>,
  formData: FormData,
): Promise<SignUpActionResponse | undefined> {
  const mbti = formData.get("mbti");
  if (!mbti) {
    return {
      user: { mbti },
      errors: {
        mbti: "MBTI를 선택해주세요",
      },
      success: false,
    };
  }

  updateUser(["mbti"], formData);

  moveToNextStepPath(Step.Mbti);
}
