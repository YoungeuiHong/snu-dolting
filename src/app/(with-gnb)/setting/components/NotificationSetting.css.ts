import { keyframes, style } from "@vanilla-extract/css";

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

const colorChangeAnimation = keyframes({
  "0%": { backgroundColor: "white" },
  "50%": { backgroundColor: "#ccc" },
  "100%": { backgroundColor: "white" },
});

export const notiLoading = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  border: "1px solid #ccc",
  width: '40px',
  height: '20px',
  borderRadius: '15px'
});

export const notiLoadingDot = style({
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  backgroundColor: "white",
  animation: `${colorChangeAnimation} 1.2s infinite`,
  selectors: {
    "&:nth-child(2)": {
      animationDelay: "0.2s",
    },
    "&:nth-child(3)": {
      animationDelay: "0.4s",
    },
  },
});