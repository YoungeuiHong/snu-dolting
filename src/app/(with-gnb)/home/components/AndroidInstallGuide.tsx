import Image from "next/image";
import { rowContainer } from "@/app/(with-gnb)/home/components/InstallGuide.css";

export const AndroidInstallGuide = () => {
  return (
    <>
      <div className={rowContainer}>
        <span>채팅 알림을 받기 위해선</span>
        <Image
          src="/icon/android_install.png"
          alt="설치"
          width={14}
          height={14}
          style={{ margin: "0 4px" }}
        />
        <span>버튼을 누르거나</span>
      </div>
      <div className={rowContainer}>
        <span>
          메뉴에서 &apos;홈 화면에 추가&apos;를 눌러 앱을 설치해주세요.
        </span>
      </div>
    </>
  );
};
