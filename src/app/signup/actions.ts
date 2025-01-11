"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export type SignUpError = Partial<Record<keyof User, string>>;

export interface SignUpActionResponse {
  user?: Partial<User>;
  errors?: SignUpError;
  success?: boolean;
}

export async function updateUser(fields: (keyof User)[], formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
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
    console.error("사용자 정보 수정 실패: ", error.message);
    throw new Error(`내 정보 수정에 실패했습니다`);
  }

  return { success: true, user: updatedUser };
}
