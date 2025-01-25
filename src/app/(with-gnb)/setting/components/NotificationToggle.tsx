"use client";
import {
  notiLoading,
  notiLoadingDot,
  toggleKnob,
  toggleKnobActive,
  toggleWrapper,
  toggleWrapperActive,
} from "./NotificationSetting.css";

interface NotificationToggleProps {
  isProcessing: boolean;
  alertGranted: boolean;
  onClickAlert: () => void;
}

export const NotificationToggle = ({
  isProcessing,
  alertGranted,
  onClickAlert,
}: NotificationToggleProps) => {
  return (
    <>
      {isProcessing ? (
        <div className={notiLoading}>
          <span className={notiLoadingDot} />
          <span className={notiLoadingDot} />
          <span className={notiLoadingDot} />
        </div>
      ) : (
        <div
          className={`${toggleWrapper} ${alertGranted ? toggleWrapperActive : ""}`}
          onClick={isProcessing ? undefined : onClickAlert}
          style={{ cursor: isProcessing ? "not-allowed" : "pointer" }}
        >
          <div
            className={`${toggleKnob} ${alertGranted ? toggleKnobActive : ""}`}
          />
        </div>
      )}
    </>
  );
};
