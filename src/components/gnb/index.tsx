import { gnbContainer } from "@/components/gnb/gnb.css";
import { GnbButton } from "@/components/gnb/GnbButton";

export const GnbBar = () => {
  return (
    <div className={gnbContainer}>
      <GnbButton src="/icon/home.svg" alt="홈" url="/main" />
      <GnbButton src="/icon/bookmark-gnb.svg" alt="스크랩" url="/scraps" />
      <GnbButton src="/icon/chat.svg" alt="채팅" url="/chat" />
      <GnbButton src="/icon/setting.svg" alt="설정" url="/setting" />
    </div>
  );
};
