import { SignUpActionResponse, updateUser } from "@/app/signup/actions";

export async function updateJob(
  prevState: Awaited<SignUpActionResponse>,
  formData: FormData,
): Promise<SignUpActionResponse> {
  const job = formData.get("job");
  if (!job) {
    return {
      errors: {
        job: "직업 정보를 알려주세요.",
      },
      success: false,
    };
  }

  return updateUser(["job"], formData);
}
