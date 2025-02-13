import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
  height: "100vh",
  width: "100%",
  fontSize: "16px",
  color: "#424242",
  wordBreak: "break-all",
  whiteSpace: "pre-line",
  lineHeight: "18px",
});

export const exitButton = style({
  backgroundColor: "#FF9411",
  color: "#ffffff",
  padding: "10px 12px",
  borderRadius: "5px",
  border: "none",
  marginTop: "10px",
  fontSize: "16px",
  fontWeight: 500,
  textDecoration: "none",
});
