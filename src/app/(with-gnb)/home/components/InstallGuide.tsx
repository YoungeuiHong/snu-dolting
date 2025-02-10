import { useEffect, useState } from "react";
import {
  bubbleContainer,
  closeButton,
  closeIconLine,
} from "@/app/(with-gnb)/home/components/InstallGuide.css";
import { AndroidInstallGuide } from "@/app/(with-gnb)/home/components/AndroidInstallGuide";
import { IOSInstallGuide } from "@/app/(with-gnb)/home/components/iOSInstallGuide";

export const InstallGuide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor;
      setIsIOS(/iPhone|iPad|iPod/i.test(userAgent));
    }
  }, []);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("hasSeenGuide");
    if (!hasSeenGuide) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenGuide", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={bubbleContainer}>
      <button className={closeButton} onClick={handleClose}>
        <span className={closeIconLine}></span>
        <span className={closeIconLine}></span>
      </button>
      {isIOS ? <IOSInstallGuide /> : <AndroidInstallGuide />}
    </div>
  );
};
