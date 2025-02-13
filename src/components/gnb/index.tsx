"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { gnbContainer } from "@/components/gnb/gnb.css";
import { GnbButton } from "@/components/gnb/GnbButton";
import { hasUnreadMessages } from "@/components/gnb/action";

export const GnbBar = () => {
  const pathname = usePathname();
  const [hasMessage, setHasMessage] = useState(false);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      const result = await hasUnreadMessages();
      setHasMessage(result);
    };

    fetchUnreadMessages();
  }, [pathname]);

  return (
    <div className={gnbContainer}>
      <GnbButton src="/icon/home.svg" alt="홈" url="/home" />
      <GnbButton src="/icon/bookmark-gnb.svg" alt="스크랩" url="/scraps" />
      <GnbButton
        src="/icon/chat.svg"
        alt="채팅"
        url="/chat"
        hasBadge={hasMessage}
      />
      <GnbButton src="/icon/setting.svg" alt="설정" url="/setting" />
    </div>
  );
};
