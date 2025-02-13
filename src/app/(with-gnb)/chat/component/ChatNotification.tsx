"use client";
import { useNotification } from "@/hooks/notification";
import { chatNotification } from "@/app/(with-gnb)/chat/component/ChatNotification.css";

export const ChatNotification = () => {
  const { enableNotification, isProcessing } = useNotification(false);

  return (
    <button onClick={enableNotification} className={chatNotification}>
      <span>🔔</span>
      <span>
        {`채팅 알림이 안 오면 여기를 눌러주세요! ${isProcessing ? "(처리 중..)" : ""}`}
      </span>
    </button>
  );
};
