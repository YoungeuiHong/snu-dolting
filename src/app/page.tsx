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
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
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
        <div className={background}></div>
        <p className={logo}>스누돌팅</p>
        <Link
          href="/fcm"
          className={loginButton}
          style={{ top: 0, zIndex: 300 }}
        >
          <span
            className={loginButtonText}
            style={{ top: "50px", zIndex: 300 }}
          >
            FCM TEST
          </span>
        </Link>
        <button className={loginButton} onClick={handleLogin}>
          <span className={loginButtonText}>구글로 시작하기</span>
        </button>
        <div className={gradientOverlay} />
      </main>
    </div>
  );
}
