import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "60px 30px calc(env(safe-area-inset-bottom, 0px) + 70px) 30px",
  width: "100%",
  maxWidth: "900px",
  margin: "auto",
  position: "relative",
  minHeight: "100vh",
  backgroundColor: "#F1F4F6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
});

export const withdrawalTitle = style({
  fontSize: "18px",
  fontWeight: 700,
  color: "#424242",
  lineHeight: "26px",
});

export const withdrawMessageContainer = style({
  backgroundColor: "#eeeeee",
  borderRadius: "5px",
  padding: "20px",
});

export const withdrawMessage = style({
  fontSize: "13px",
  color: "#424242",
  wordBreak: "break-all",
  whiteSpace: "pre-line",
  lineHeight: "18px",
});

export const withdrawalButton = style({
  backgroundColor: "#c62828",
  color: "#ffffff",
  padding: "10px 12px",
  borderRadius: "5px",
  border: "none",
  marginTop: "10px",
  fontWeight: 500,
});
