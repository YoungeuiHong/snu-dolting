import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/supabase";
import { redirect } from "next/navigation";

type UsersInsert = TablesInsert<"users">;

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("exchangeCodeForSession 실패: ", sessionError);
      redirect("/");
    }

    // 현재 로그인된 유저 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user || !user.email) {
      redirect("/");
      return;
    }

    const userData: UsersInsert = {
      id: user.id,
      email: user.email,
    };

    const { data, error } = await supabase
      .from("users")
      .upsert(userData, { onConflict: "id" })
      .select();

    if (error) {
      console.error("로그인 시 사용자 정보 조회 실패:", error);
      redirect("/");
    }

    const response =
      data?.length && data[0].is_profile_complete
        ? NextResponse.redirect(`${origin}/home`)
        : NextResponse.redirect(`${origin}/signup/nickname`);

    response.cookies.set("userId", user.id, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax", 
      path: "/", 
    });

    return response;
  }

  return NextResponse.redirect(`${origin}`);
}
