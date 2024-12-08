import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/supabase";

type UsersInsert = TablesInsert<"users">;

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      // TODO: 로그인 에러 처리
      console.error("세션 교환 실패:", sessionError);
    }

    // 현재 로그인된 유저 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user || !user.email) {
      // TODO: 로그인 에러 처리
      console.error("유저 정보를 가져오는 데 실패:", userError);
      return;
    }

    const userData: UsersInsert = {
      id: user.id,
      email: user.email,
      is_profile_complete: false,
    };

    const { data, error } = await supabase
      .from("users")
      .upsert(userData, { onConflict: "id" })
      .select();

    if (error) {
      // TODO: 로그인 에러 처리
      console.error("유저 동기화 실패:", error);
    }

    if (data?.length && data[0].is_profile_complete) {
      return NextResponse.redirect(`${origin}/main`);
    } else {
      return NextResponse.redirect(`${origin}/signup`);
    }
  }

  // TODO: 로그인 에러 처리
  return NextResponse.redirect(`${origin}`);
}
