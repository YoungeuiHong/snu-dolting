import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json(
      { error: "인증된 사용자가 아닙니다." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const nickname = searchParams.get("nickname");

  if (!nickname) {
    return NextResponse.json(
      { error: "닉네임이 필요합니다." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // nickname에 해당하는 유저의 id 찾기
  const { data: targetUser, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("nickname", nickname)
    .single();

  if (userError) {
    console.error(
      nickname,
      "에 해당되는 스크랩 상대 조회 실패: ",
      userError.message
    );
    return NextResponse.json(
      { error: "스크랩 상대 조회 실패", details: userError.message },
      { status: 500 }
    );
  }

  if (!targetUser) {
    console.error(nickname, "에 해당되는 스크랩 상대 조회 실패");
    return NextResponse.json(
      { error: "닉네임에 해당되는 유저를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const { data: scrap, error: scrapError } = await supabase
    .from("scraps")
    .select("id")
    .eq("user_id", userId)
    .eq("target_user_id", targetUser.id)
    .single();

  if (scrapError) {
    return NextResponse.json({ isScrapped: false }, { status: 200 });
  }

  return NextResponse.json({ isScrapped: !!scrap }, { status: 200 });
}
