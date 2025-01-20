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
    const previousState = alertGranted;

    setAlertGranted(!alertGranted);

    if (alertGranted) {
      try {
        await updateFCMToken(null);
      } catch (e) {
        setAlertGranted(previousState);
        toastError(e);
      }
    } else {
      if ("Notification" in window) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const token = await getToken(messaging, {
              vapidKey:
                "BMuOuAa7hCW6sW16fgKLOQaNulOhO7n21D8Ziqq_UxWibYPdaO6hdEbMuHZ0UuBV3E3tIQhkrAyuWdqoKAERGe4",
            });
            if (token) {
              await updateFCMToken(token);
            } else {
              console.error("FCM 토큰 발급 실패");
              setAlertGranted(previousState);
            }
          } else {
            setAlertGranted(previousState);
          }
        } catch (e) {
          setAlertGranted(previousState);
          toastError(e);
        }
      } else {
        setAlertGranted(previousState);
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
