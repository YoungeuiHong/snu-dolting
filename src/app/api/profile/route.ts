import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json(
      { error: "인증된 사용자가 아닙니다." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);
  const nickname = searchParams.get("nickname");

  if (!nickname) {
    return NextResponse.json(
      { error: "닉네임이 필요합니다." },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data: queriedUsers, error: queryError } = await supabase
    .from("users")
    .select(
      "birth_year, has_children, height, ideal_type, inner_description, introduction, is_snu_graduate, job, location, nickname, photo_exchange_intent, profile_picture, religion, remarriage_intent, weight, mbti",
    )
    .eq("nickname", nickname);

  if (queryError) {
    console.error("프로필 조회 실패: ", queryError.message);
    return NextResponse.json(
      { error: "프로필 조회에 실패했습니다.", details: queryError.message },
      { status: 500 },
    );
  }

  if (!queriedUsers || queriedUsers.length === 0) {
    return NextResponse.json(
      { error: "조회된 사용자가 없습니다." },
      { status: 404 },
    );
  }

  const userResult = queriedUsers[0];

  if (!userResult) {
    return NextResponse.json(
      { error: "조회된 사용자가 없습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json(userResult);
}
