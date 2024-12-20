import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";

export async function getUserInfo<T extends keyof User = keyof User>(
  columns?: T[],
): Promise<Pick<User, T>> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const selectColumns =
    columns && columns.length > 0 ? columns.join(", ") : "*";

  const { data, error } = await supabase
    .from("users")
    .select(selectColumns)
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No data found for the user");
  }

  return data as unknown as Pick<User, T>;
}
