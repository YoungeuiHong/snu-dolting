"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";
import { UserFilters } from "@/types/filter";

interface GetUsersResponse {
  users: Partial<User>[];
}

export async function getAllUsers(
  filters?: UserFilters,
): Promise<GetUsersResponse> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email || !user.user_metadata.is_super_admin) {
    throw new Error("인증된 관리자가 아닙니다.");
  }

  let query = supabase
    .from("users")
    .select(
      "nickname, profile_picture, introduction, birth_year, has_children, height, weight, job, religion, location",
    );

  query = query.neq("id", user.id);

  if (filters?.birthYearRange) {
    if (filters.birthYearRange.min !== undefined) {
      query = query.gte("birth_year", filters.birthYearRange.min);
    }
    if (filters.birthYearRange.max !== undefined) {
      query = query.lte("birth_year", filters.birthYearRange.max);
    }
  }
  if (
    filters?.remarriageIntent !== undefined &&
    filters?.remarriageIntent !== "all"
  ) {
    query = query.eq("remarriage_intent", filters.remarriageIntent);
  }
  if (filters?.hasChildren !== undefined && filters?.hasChildren !== "all") {
    query = query.eq("has_children", filters.hasChildren);
  }
  if (filters?.heightRange) {
    if (filters.heightRange.min !== undefined) {
      query = query.gte("height", filters.heightRange.min);
    }
    if (filters.heightRange.max !== undefined) {
      query = query.lte("height", filters.heightRange.max);
    }
  }
  if (filters?.religion) {
    query = query.in("religion", filters.religion);
  }

  const { data: filteredUsers, error } = await query;

  if (error) {
    console.error("사용자 목록 조회 중 에러 발생: ", error);
    throw new Error("사용자 목록 조회에 실패했습니다");
  }

  return { users: filteredUsers };
}
