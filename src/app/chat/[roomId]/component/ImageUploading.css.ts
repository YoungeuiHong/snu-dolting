import { keyframes, style } from "@vanilla-extract/css";

export const imageLoadingWrapper = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  gap: "5px",
});

export const imageLoadingBackground = style({
  width: "70%",
  aspectRatio: "1.49 / 1",
  borderRadius: "10px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#EAEEF1",
});

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

export const loadingSpinner = style({
  width: "40px",
  height: "40px",
  border: "4px solid #ffffff",
  borderTop: "4px solid #BABFC1",
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
});
