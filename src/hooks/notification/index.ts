"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getToken } from "firebase/messaging";
import { messaging } from "@/utils/firebase";
import { updateFCMToken } from "@/app/(with-gnb)/setting/components/actions";

export const useNotification = (hasFcmToken: boolean) => {
  const [alertGranted, setAlertGranted] = useState<boolean>(hasFcmToken);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setAlertGranted(Notification.permission === "granted" && hasFcmToken);
    }
  }, [hasFcmToken]);

  const handleError = (message: string, error?: unknown) => {
    console.error(message, error);
    toast(message);
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
        handleError("알림 설정에 실패했습니다");
        return null;
      }

      return token;
    } catch (error) {
      handleError("알림 설정에 실패했습니다", error);
      return null;
    }
  };

  const enableNotification = async () => {
    try {
      setIsProcessing(true);
      const token = await requestNotificationPermission();
      if (!token) return;
      await updateFCMToken(token);
      setAlertGranted(true);
    } catch (error) {
      handleError("알림 설정에 실패했습니다", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const disableNotification = async () => {
    try {
      setIsProcessing(true);
      await updateFCMToken(null);
      setAlertGranted(false);
    } catch (error) {
      handleError("알림 해제에 실패했습니다", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    alertGranted,
    isProcessing,
    enableNotification,
    disableNotification,
  };
};
