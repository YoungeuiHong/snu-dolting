import { style, keyframes } from "@vanilla-extract/css";

const blinkAnimation = keyframes({
  "0%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.4,
  },
  "100%": {
    opacity: 1,
  },
});

export const skeleton = style({
  position: "relative",
  borderRadius: "8px",
  height: "16px",
  width: "100%",
  background: "#e0e0e0",
  animation: `${blinkAnimation} 1.5s infinite ease-in-out`,
});
