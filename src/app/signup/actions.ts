"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";

export interface SignUpActionResponse {
  user?: Partial<User>;
  errors?: Record<string, string>;
  success?: boolean;
}

export async function updateUser(fields: (keyof User)[], formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  const updateData: Record<string, FormDataEntryValue | null> = {};

  fields.forEach((field) => {
    updateData[field] = formData.get(field);
  });

  if (Object.keys(updateData).length === 0) {
    throw new Error("업데이트할 데이터가 없습니다.");
  }

  const { data: updatedUser, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("email", user.email);

  if (error) {
    throw new Error(`업데이트 중 오류 발생: ${error.message}`);
  }

  return { success: true, user: updatedUser };
}
