import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { UserFilters } from "@/types/filter";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const filters: UserFilters = await req.json();

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json(
      { error: "인증된 사용자가 아닙니다." },
      { status: 401 },
    );
  }

  const { data: myInfo, error: myInfoError } = await supabase
    .from("users")
    .select("gender")
    .eq("id", userId)
    .single();

  if (!myInfo || myInfoError || !myInfo.gender) {
    return NextResponse.json(
      { error: "사용자 정보 조회에 실패했습니다." },
      { status: 500 },
    );
  }

  let query = supabase
    .from("users")
    .select(
      "nickname, profile_picture, introduction, birth_year, has_children, height, weight, job, religion, location, is_profile_complete, mbti",
    )
    .neq("id", userId)
    .eq("gender", myInfo.gender === "male" ? "female" : "male")
    .eq("is_profile_complete", true);

  if (filters.birthYearRange) {
    if (filters.birthYearRange.min !== undefined) {
      query = query.gte("birth_year", filters.birthYearRange.min);
    }
    if (filters.birthYearRange.max !== undefined) {
      query = query.lte("birth_year", filters.birthYearRange.max);
    }
  }
  if (filters.remarriageIntent && filters.remarriageIntent !== "all") {
    query = query.eq("remarriage_intent", filters.remarriageIntent);
  }
  if (filters.hasChildren && filters.hasChildren !== "all") {
    query = query.eq("has_children", filters.hasChildren);
  }
  if (filters.heightRange) {
    if (filters.heightRange.min !== undefined) {
      query = query.gte("height", filters.heightRange.min);
    }
    if (filters.heightRange.max !== undefined) {
      query = query.lte("height", filters.heightRange.max);
    }
  }
  if (filters.religion) {
    query = query.in("religion", filters.religion);
  }

  query.order("created_at", { ascending: false });

  const { data: filteredUsers, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "사용자 목록 조회에 실패했습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json(filteredUsers);
}
