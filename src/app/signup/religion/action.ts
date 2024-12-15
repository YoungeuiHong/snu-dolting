import { SignUpActionResponse, updateUser } from "@/app/signup/actions";

export async function updateReligion(
  prevState: Awaited<SignUpActionResponse>,
  formData: FormData,
): Promise<SignUpActionResponse> {
  const religion = formData.get("religion");
  if (!religion) {
    return {
      errors: {
        religion: "종교 정보를 알려주세요.",
      },
      success: false,
    };
  }

  return updateUser(["religion"], formData);
}
