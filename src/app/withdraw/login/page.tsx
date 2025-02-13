"use client";
import { container, exitButton } from "@/app/withdraw/login/page.css";
import { logout } from "@/app/(with-gnb)/setting/action";

export default function WithdrawalLoginDeclinePage() {
  const handleClickExit = async () => {
    await logout();
  };

  return (
    <div className={container}>
      <p>탈퇴한 사용자는 재가입이 불가능합니다</p>
      <button className={exitButton} onClick={handleClickExit}>
        나가기
      </button>
    </div>
  );
}
