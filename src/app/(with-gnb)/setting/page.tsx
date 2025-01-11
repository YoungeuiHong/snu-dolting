"use client";
import { logout } from "@/app/(with-gnb)/setting/action";
import Image from "next/image";
import Link from "next/link";
import {
  itemContainer,
  settingContainer,
} from "@/app/(with-gnb)/setting/page.css";
import { NotificationSetting } from "@/app/(with-gnb)/setting/components/NotificationSetting";
import { isServerError, toastError } from "@/utils/error";

export default function SettingPage() {
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
    <div className={settingContainer}>
      <Link
        href="/signup/nickname"
        style={{ textDecoration: "none", color: "#424242" }}
      >
        <div className={itemContainer}>
          <Image src="/icon/edit.svg" alt="로그아웃" width={14} height={14} />
          <span>내 정보 수정하기</span>
        </div>
      </Link>
      <NotificationSetting />
      <div className={itemContainer} onClick={handleLogout}>
        <Image src="/icon/logout.svg" alt="로그아웃" width={14} height={14} />
        <span>로그아웃하기</span>
      </div>
    </div>
  );
}
