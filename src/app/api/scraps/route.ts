import { User } from "@/types/user";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json(
      { error: "인증된 사용자가 아닙니다." },
      { status: 401 },
    );
  }

  const { data: scrapsData, error: scrapsError } = await supabase
    .from("scraps")
    .select(
      `
        users!scraps_target_user_id_fkey (
        nickname, profile_picture, birth_year, has_children,
        height, weight, job, religion, location, introduction, mbti
  )
`,
    )
    .eq("user_id", userId);

  if (scrapsError) {
    console.error("스크랩 목록 조회 실패:", scrapsError.message);
    throw new Error("스크랩 목록 조회에 실패했습니다.");
  }

  const scraps = (scrapsData
    ?.map((scrap) => scrap.users)
    .filter((user) => !!user) || []) as Partial<User>[];

  return NextResponse.json(scraps);
}
