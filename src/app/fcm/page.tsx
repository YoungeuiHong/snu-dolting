"use client";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { messaging } from "@/utils/firebase";

export default function useNotificationHandler() {
  const [isPermitted, setIsPermitted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");

  async function onClickAlert() {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "Notification" in window &&
      "PushManager" in window
    ) {
      Notification.requestPermission().then(async (result) => {
        setIsPermitted(result === "granted");
      });
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleIncomingMessage = () => {
      if (messaging) {
        onMessage(messaging, (payload) => {
          setMessage(JSON.stringify(payload));
        });
      }
    };

    handleIncomingMessage();
  }, []);

  const registerToken = async () => {
    try {
      if (typeof window === "undefined" || !messaging) {
        console.log("브라우저 환경 또는 messaging 없음");
        return;
      }

      const currentToken = await getToken(messaging, {
        vapidKey:
          "BMuOuAa7hCW6sW16fgKLOQaNulOhO7n21D8Ziqq_UxWibYPdaO6hdEbMuHZ0UuBV3E3tIQhkrAyuWdqoKAERGe4",
      });

      if (currentToken) {
        console.log("FCM 토큰:", currentToken);
        setToken(currentToken);
      } else {
        console.log("토큰을 가져오지 못했습니다.");
      }
    } catch (err) {
      console.error("Error getting FCM token:", err);
    }
  };

  return (
    <div>
      <h1> 알림 허용 상태: {isPermitted}</h1>
      <p>수신된 메세지: {message}</p>
      <p>발급된 토큰: {token}</p>
      <button onClick={onClickAlert}>알림 허용</button>
      <button onClick={registerToken}>토큰 발급</button>
    </div>
  );
}
