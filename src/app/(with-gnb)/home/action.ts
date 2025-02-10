"use server";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/types/user";
import { UserFilters } from "@/types/filter";
import { unstable_cache } from "next/cache";
import { SupabaseClient } from "@supabase/supabase-js";

interface GetUsersResponse {
  users: Partial<User>[];
}

export const getCachedUsers = unstable_cache(
  async (
    supabase: SupabaseClient,
    filters?: UserFilters,
  ): Promise<GetUsersResponse> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      throw new Error("인증된 사용자가 아닙니다.");
    }

    const { data: myInfo, error: myInfoError } = await supabase
      .from("users")
      .select("gender")
      .eq("id", user.id)
      .single();

    if (!myInfo || myInfoError || !myInfo.gender) {
      console.error("사용자 목록 조회 중 에러 발생: ", myInfo, myInfoError);
      throw new Error("사용자 목록 조회에 실패했습니다");
    }

    let query = supabase
      .from("users")
      .select(
        "nickname, profile_picture, introduction, birth_year, has_children, height, weight, job, religion, location, is_profile_complete, mbti",
      )
      .neq("id", user.id)
      .eq("gender", myInfo.gender === "male" ? "female" : "male")
      .eq("is_profile_complete", true);

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
  },
  ["get-cached-users"],
  {
    revalidate: 60,
  },
);

export async function getUsers(
  filters?: UserFilters,
): Promise<GetUsersResponse> {
  const supabase = await createClient();

  return getCachedUsers(supabase, filters);
}
