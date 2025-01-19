"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  leftContainer,
  notificationSetting,
  toggleKnob,
  toggleKnobActive,
  toggleWrapper,
  toggleWrapperActive,
} from "@/app/(with-gnb)/setting/components/NotificationSetting.css";
import { getToken } from "firebase/messaging";
import { messaging } from "@/utils/firebase";
import { updateFCMToken } from "./actions";
import { toastError } from "@/utils/error";

interface Props {
  hasFcmToken: boolean;
}

export const NotificationSetting = ({ hasFcmToken }: Props) => {
  const [alertGranted, setAlertGranted] = useState<boolean>(hasFcmToken);

  useEffect(() => {
    const initializeAlertGranted = async () => {
      if (typeof window !== "undefined" && "Notification" in window) {
        try {
          setAlertGranted(Notification.permission === "granted" && hasFcmToken);
        } catch (e) {
          toastError(e);
        }
      }
    };
    initializeAlertGranted();
  }, []);

  const onClickAlert = async () => {
    if (alertGranted) {
      // 알림 비활성화
      await updateFCMToken(null);
      setAlertGranted(false);
    } else {
      // 알림 활성화
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey:
              "BMuOuAa7hCW6sW16fgKLOQaNulOhO7n21D8Ziqq_UxWibYPdaO6hdEbMuHZ0UuBV3E3tIQhkrAyuWdqoKAERGe4",
          });
          if (token) {
            await updateFCMToken(token);
            setAlertGranted(true);
          } else {
            console.error("FCM 토큰 발급 실패");
          }
        }
      }
    }
  };

  return (
    <div className={notificationSetting}>
      <div className={leftContainer}>
        <Image src="/icon/notification.svg" alt="알림" width={14} height={14} />
        <span>채팅 알림 수신</span>
      </div>
      <div
        className={`${toggleWrapper} ${alertGranted ? toggleWrapperActive : ""}`}
        onClick={onClickAlert}
      >
        <div
          className={`${toggleKnob} ${alertGranted ? toggleKnobActive : ""}`}
        ></div>
      </div>
    </div>
  );
};
