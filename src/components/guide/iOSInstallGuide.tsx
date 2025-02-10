import Image from "next/image";
import { rowContainer } from "@/components/guide/InstallGuide.css";

export const IOSInstallGuide = () => {
  return (
    <>
      <div className={rowContainer}>
        <span>채팅 알림을 받기 위해선</span>
        <Image
          src="/icon/ios_share.png"
          alt="공유"
          width={14}
          height={14}
          style={{ margin: "0 4px" }}
        />
        <span>에서</span>
      </div>
      <div className={rowContainer}>
        <span>&apos;홈 화면에 추가&apos;를 눌러 앱을 설치해주세요.</span>
      </div>
    </>
  );
};
