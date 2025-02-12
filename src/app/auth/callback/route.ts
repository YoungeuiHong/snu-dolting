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

    // if (!user.email.endsWith("@snu.ac.kr")) {
    //   await supabase.auth.signOut();
    //   redirect("/");
    //   return;
    // }

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

    let redirectUrl = `${origin}/signup/nickname`;
    if (data?.length && data[0].is_profile_complete)
      redirectUrl = `${origin}/home`;
    if (user.user_metadata.is_super_admin) redirectUrl = `${origin}/admin`;

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    await supabase.auth.updateUser({
      data: {
        complete: data[0].is_profile_complete,
      },
    });

    return response;
  }

  return NextResponse.redirect(`${origin}`);
}
