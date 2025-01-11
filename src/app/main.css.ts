import { style, keyframes } from "@vanilla-extract/css";

const zoomIn = keyframes({
  from: {
    transform: "scale(1.1)",
  },
  to: {
    transform: "scale(1)",
  },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100svh",
  padding: "0 80px",
  position: "relative",
  overflow: "hidden",
});

export const background = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage:
    'linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url("/main_background.avif")',
  backgroundSize: "cover",
  backgroundPosition: "top center",
  backgroundRepeat: "no-repeat",
  animation: `${zoomIn} 1.5s ease-out`,
  zIndex: 0,
});

export const gradientOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1) 80%)",
  pointerEvents: "none",
  zIndex: 1,
});

export const logo = style({
  width: "100%",
  height: "auto",
  fontFamily: "gmarket",
  textAlign: "center",
  fontSize: "45px",
  color: "white",
  whiteSpace: "pre-line",
  lineHeight: "50px",
  fontWeight: 500,
  zIndex: 2,
});

export const loginButton = style({
  position: "absolute",
  bottom: 50,
  left: "50%",
  transform: "translateX(-50%)",
  width: "80%",
  maxWidth: "340px",
  height: "50px",
  background: "transparent",
  border: "1px solid white",
  borderRadius: "50px",
  padding: "10px 20px",
  display: "inline-block",
  textAlign: "center",
  color: "white",
  fontWeight: 500,
  fontSize: "15px",
  zIndex: 2,
});

export const loginButtonText = style({
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  color: "white",
  fontWeight: 500,
  fontSize: "15px",
});

export const customToast = style({
  background: "#616161",
  bottom: "50px",
  borderRadius: "60px",
  color: "white",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
});
