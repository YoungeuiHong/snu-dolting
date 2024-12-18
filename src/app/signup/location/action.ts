import { SignUpActionResponse, updateUser } from "@/app/signup/actions";

export async function updateLocation(
  prevState: Awaited<SignUpActionResponse>,
  formData: FormData,
): Promise<SignUpActionResponse> {
  const location = formData.get("location")?.toString().trim();

  if (!location) {
    return {
      errors: {
        location: "거주지를 알려주세요",
      },
      success: false,
    };
  }

  return updateUser(["location"], formData);
}
