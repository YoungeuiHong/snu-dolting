import { keyframes, style } from "@vanilla-extract/css";

const colorChangeAnimation = keyframes({
  "0%": { backgroundColor: "white" },
  "50%": { backgroundColor: "#ccc" },
  "100%": { backgroundColor: "white" },
});

export const loaderContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "7px",
});

export const dot = style({
  width: "8px",
  height: "8px",
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
