"use client";
import { createClient } from "@/utils/supabase/client";

export default function LoginButton() {
  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("로그아웃 중 에러 발생: " + error.message);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
