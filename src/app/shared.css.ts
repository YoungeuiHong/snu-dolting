import { style } from "@vanilla-extract/css";

export const transparentButton = style({
  border: "none",
  background: "none",
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const bottomBar = style({
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "900px",
  padding: "12px",
  paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
  boxSizing: "border-box",
  transition: "bottom 0.2s ease-in-out",
});

export const fullSize = style({
  width: "100%",
  height: "100dvh",
});

export const flexColumnCenter = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const blackRoundButton = style({
  width: "100%",
  height: "48px",
  background: "#242729",
  color: "white",
  fontSize: "14px",
  fontWeight: 500,
  borderRadius: "24px",
  padding: "14px 24px",
  border: "none",
  textDecoration: "none",
});

export const header = style({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "52px",
  padding: "0 12px",
  boxSizing: "border-box",
  background: "white",
});

export const loadingContainer = style({
  width: "100%",
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});
