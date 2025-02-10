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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingDots } from "@/components/loading/LoadingDots";
import { InstallGuide } from "@/components/guide";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);

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
          scope: "email",
        },
      },
    });

    if (error) {
      console.error("로그인 중 에러 발생: " + error.message);
      toast("로그인에 실패했습니다");
    }

    setLoading(false);
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.error("서비스 워커 등록 실패 : ", err));
    }
  }, []);

  return (
    <div>
      <main className={container}>
        <InstallGuide />
        <div className={background}></div>
        <p className={logo}>스누돌팅</p>
        <button className={loginButton} onClick={handleLogin}>
          {loading ? (
            <LoadingDots loading />
          ) : (
            <span className={loginButtonText}>구글로 시작하기</span>
          )}
        </button>
        <div className={gradientOverlay} />
      </main>
    </div>
  );
}
