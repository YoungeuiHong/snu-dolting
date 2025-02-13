"use client";
import Image from "next/image";
import {
  leftContainer,
  notificationSetting,
} from "@/app/(with-gnb)/setting/components/NotificationSetting.css";
import { NotificationToggle } from "@/app/(with-gnb)/setting/components/NotificationToggle";
import { useNotification } from "@/hooks/notification";

interface Props {
  hasFcmToken: boolean;
}

export const NotificationSetting = ({ hasFcmToken }: Props) => {
  const {
    alertGranted,
    isProcessing,
    enableNotification,
    disableNotification,
  } = useNotification(hasFcmToken);

  const onClickAlert = async () => {
    if (isProcessing) return;

    if (alertGranted) {
      await disableNotification();
    } else {
      await enableNotification();
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
