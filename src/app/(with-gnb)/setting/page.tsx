import Image from "next/image";
import Link from "next/link";
import {
  itemContainer,
  settingContainer,
} from "@/app/(with-gnb)/setting/page.css";
import { NotificationSetting } from "@/app/(with-gnb)/setting/components/NotificationSetting";
import { LogoutButton } from "@/app/(with-gnb)/setting/components/LogoutButton";
import { getFCMTokenStatus } from "@/app/(with-gnb)/setting/components/actions";

export default async function SettingPage() {
  const hasFcmToken = await getFCMTokenStatus();

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
      <NotificationSetting hasFcmToken={hasFcmToken} />
      <LogoutButton />
    </div>
  );
}
