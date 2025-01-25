"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getToken } from "firebase/messaging";
import {
  leftContainer,
  notificationSetting,
} from "@/app/(with-gnb)/setting/components/NotificationSetting.css";
import { messaging } from "@/utils/firebase";
import { NotificationToggle } from "@/app/(with-gnb)/setting/components/NotificationToggle";
import { updateFCMToken } from "@/app/(with-gnb)/setting/components/actions";

interface Props {
  hasFcmToken: boolean;
}

export const NotificationSetting = ({ hasFcmToken }: Props) => {
  const [alertGranted, setAlertGranted] = useState<boolean>(hasFcmToken);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setAlertGranted(Notification.permission === "granted" && hasFcmToken);
    }
  }, [hasFcmToken]);

  const handleError = (message: string) => {
    toast(message);
    setIsProcessing(false);
  };

  const handleSuccess = (isGranted: boolean) => {
    setAlertGranted(isGranted);
    setIsProcessing(false);
  };

  const requestNotificationPermission = async (): Promise<string | null> => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        handleError("알림 권한이 거부되었습니다");
        return null;
      }

      const token = await getToken(messaging, {
        vapidKey:
          "BMuOuAa7hCW6sW16fgKLOQaNulOhO7n21D8Ziqq_UxWibYPdaO6hdEbMuHZ0UuBV3E3tIQhkrAyuWdqoKAERGe4",
      });

      if (!token) {
        handleError("FCM 토큰 발급 실패");
        return null;
      }

      return token;
    } catch (error) {
      console.error("알림 권한 요청 중 오류 발생:", error);
      handleError("알림 설정에 실패했습니다");
      return null;
    }
  };

  const enableNotification = async () => {
    const token = await requestNotificationPermission();
    if (token) {
      try {
        await updateFCMToken(token);
        handleSuccess(true);
      } catch (error) {
        console.error("알림 활성화 실패:", error);
        handleError("알림 설정에 실패했습니다");
      }
    }
  };

  const disableNotification = async () => {
    try {
      await updateFCMToken(null);
      handleSuccess(false);
    } catch (error) {
      console.error("알림 해제 실패:", error);
      handleError("알림 해제에 실패했습니다");
    }
  };

  const onClickAlert = () => {
    if (isProcessing) return;

    setIsProcessing(true);

    if (alertGranted) {
      disableNotification();
    } else {
      enableNotification();
    }
  };

  return (
    <div className={notificationSetting}>
      <div className={leftContainer}>
        <Image src="/icon/notification.svg" alt="알림" width={14} height={14} />
        <span>채팅 알림 수신</span>
      </div>
      <NotificationToggle
        isProcessing={isProcessing}
        alertGranted={alertGranted}
        onClickAlert={onClickAlert}
      />
    </div>
  );
};
