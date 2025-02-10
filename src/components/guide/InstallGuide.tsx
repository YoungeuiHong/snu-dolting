import { useEffect, useState } from "react";
import {
  bubbleContainer,
  closeButton,
  closeIconLine,
} from "@/components/guide/InstallGuide.css";
import { AndroidInstallGuide } from "@/components/guide/AndroidInstallGuide";
import { IOSInstallGuide } from "@/components/guide/iOSInstallGuide";

interface Props {
  bottom?: number;
  fixed?: boolean;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export const InstallGuide = ({ bottom, fixed }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor;
      setIsIOS(/iPhone|iPad|iPod/i.test(userAgent));

      // iOS: PWA 환경인지 확인 (navigator.standalone)
      const navigatorWithStandalone = navigator as NavigatorWithStandalone;
      const isIOSPWA = navigatorWithStandalone.standalone === true;

      // Android: PWA 환경인지 확인 (display-mode)
      const isAndroidPWA = window.matchMedia(
        "(display-mode: standalone)",
      ).matches;

      if (isIOSPWA || isAndroidPWA) {
        setIsVisible(false);
      } else {
        const hasSeenGuide = localStorage.getItem("hasSeenGuide");
        if (!hasSeenGuide) {
          setIsVisible(true);
        }
      }
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenGuide", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={bubbleContainer}
      style={{
        bottom: `${bottom || 120}px`,
        position: fixed ? "fixed" : "absolute",
      }}
    >
      <button className={closeButton} onClick={handleClose}>
        <span className={closeIconLine}></span>
        <span className={closeIconLine}></span>
      </button>
      {isIOS ? <IOSInstallGuide /> : <AndroidInstallGuide />}
    </div>
  );
};
