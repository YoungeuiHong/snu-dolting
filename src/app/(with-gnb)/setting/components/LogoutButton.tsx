"use client";
import Image from "next/image";
import { itemContainer } from "@/app/(with-gnb)/setting/page.css";
import { logout } from "@/app/(with-gnb)/setting/action";
import { isServerError, toastError } from "@/utils/error";

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      if (isServerError(e)) {
        toastError(e);
      }
    }
  };

  return (
    <div className={itemContainer} onClick={handleLogout}>
      <Image src="/icon/logout.svg" alt="로그아웃" width={14} height={14} />
      <span>로그아웃하기</span>
    </div>
  );
};
