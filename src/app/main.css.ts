import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100svh",
  padding: "0 80px",
  backgroundImage:
    'linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url("https://img.freepik.com/premium-photo/3d-rendering-soft-pink-blue-pastel-abstract-background-with-floating-pastel-balls_1209158-19071.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "top center",
  backgroundRepeat: "no-repeat",
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
  fontFamily: "Pretendard",
  display: "inline-block",
  textAlign: "center",
  color: "white",
  fontWeight: 500,
  fontSize: "15px",
  zIndex: 2,
});

export const loginButtonText = style({
  fontFamily: "Pretendard",
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  color: "white",
  fontWeight: 500,
  fontSize: "15px",
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
