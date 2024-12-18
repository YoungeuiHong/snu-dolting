import { SignUpActionResponse, updateUser } from "@/app/signup/actions";

export async function updateJobAndGraduate(
  prevState: Awaited<SignUpActionResponse>,
  formData: FormData,
): Promise<SignUpActionResponse> {
  const job = formData.get("job");
  const graduate = formData.get("is_snu_graduate");

  const errors: Record<string, string> = {};

  if (!job) {
    errors.job = "직업 정보를 알려주세요.";
  }

  if (!graduate) {
    errors.isSnuGraduate = "본교 졸업 여부를 알려주세요";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  return updateUser(["job", "is_snu_graduate"], formData);
}
