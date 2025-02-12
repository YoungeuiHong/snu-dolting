"use client";
import {
  loginButton,
  loginMessage,
  loginPageContainer,
} from "@/app/login/page.css";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const handleLogin = async () => {
    const supabase = createClient();
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/auth/callback"
        : "https://www.snu-dolting.com/auth/callback";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
          scope: "openid email offline_access",
        },
      },
    });

    if (error) {
      console.error("로그인 중 에러 발생: " + error.message);
      toast("로그인에 실패했습니다");
    }
  };

  return (
    <div className={loginPageContainer}>
      <p className={loginMessage}>로그인 후 이용해주세요</p>
      <button className={loginButton} onClick={handleLogin}>
        로그인하기
      </button>
    </div>
  );
}
