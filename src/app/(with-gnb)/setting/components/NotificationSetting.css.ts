import { style } from "@vanilla-extract/css";

export const notificationSetting = style({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "space-between",
  background: "white",
  padding: "20px",
  fontSize: "14px",
});

export const leftContainer = style({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});

export const toggleWrapper = style({
  width: "40px",
  height: "20px",
  borderRadius: "15px",
  backgroundColor: "#ccc",
  display: "flex",
  alignItems: "center",
  padding: "2px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
});

export const toggleWrapperActive = style({
  backgroundColor: "#4CAF50",
});

export const toggleKnob = style({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  backgroundColor: "white",
  transition: "transform 0.3s ease",
});

export const toggleKnobActive = style({
  transform: "translateX(20px)",
});
