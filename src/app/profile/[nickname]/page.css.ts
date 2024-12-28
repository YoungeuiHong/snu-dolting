import { style } from "@vanilla-extract/css";
import { blackRoundButton, bottomBar, header } from "@/app/shared.css";

export const prevHeader = style([
  header,
  {
    background: "#F1F4F6",
    zIndex: 300,
  },
]);

export const container = style({
  padding: "50px 10px 70px 10px",
  width: "100%",
  maxWidth: "900px",
  margin: "auto",
  position: "relative",
  minHeight: "100vh",
  backgroundColor: "#F1F4F6",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const imageWrapper = style({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 0.8",
  maxHeight: "500px",
  overflow: "hidden",
  borderRadius: "10px",
});

export const gradientOverlay = style({
  width: "100%",
  height: "100%",
  position: "absolute",
  bottom: 0,
  left: 0,
  zIndex: 100,
  background:
    "linear-gradient(0deg, rgba(217, 217, 217, 0), rgba(217, 217, 217, 0)), linear-gradient(180deg, rgba(54, 54, 54, 0) 54.44%, rgba(38, 38, 38, 0.8) 76.08%, rgba(22, 22, 22, 0.8) 85.38%)",
});

export const introWrapper = style({
  position: "absolute",

  bottom: 20,
  left: 20,
  zIndex: 200,
});

export const nicknameFont = style({
  fontSize: "18px",
  lineHeight: "28px",
  color: "white",
  fontWeight: 700,
});

export const introduction = style({
  fontSize: "16px",
  lineHeight: "28px",
  color: "white",
  fontWeight: 400,
});

export const box = style({
  background: "white",
  borderRadius: "10px",
  width: "100%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const text = style({
  color: "#424242",
  wordWrap: "break-word",
  wordBreak: "break-word",
});

export const title = style([
  text,
  {
    fontSize: "14px",
    fontWeight: 500,
    margin: "5px 0",
  },
]);

export const content = style([
  text,
  {
    fontSize: "13px",
    lineHeight: "24px",
    fontWeight: 400,
  },
]);

export const actionBar = style([
  bottomBar,
  {
    borderTop: "1px solid #8a8a8a1a",
    background: "white",
    padding: "8px 12px",
    zIndex: 300,
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
]);

export const chattingButton = style([
  blackRoundButton,
  {
    height: "44px",
    fontWeight: 500,
    fontSize: "14px",
    borderRadius: "4px",
  },
]);
