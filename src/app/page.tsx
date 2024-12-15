"use client";
import {
  background,
  container,
  gradientOverlay,
  loginButton,
  loginButtonText,
  logo,
} from "./main.css";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const handleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "https://www.googleapis.com/auth/userinfo.email",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("로그인 중 에러 발생: " + error.message);
    }
  };

  return (
    <div>
      <main className={container}>
        <div className={background}></div>
        <p className={logo}>스누돌팅</p>
        <button className={loginButton} onClick={handleLogin}>
          <span className={loginButtonText}>구글로 시작하기</span>
        </button>
        <div className={gradientOverlay} />
      </main>
    </div>
  );
}
