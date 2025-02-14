import { style } from "@vanilla-extract/css";

export const imgContainer = style({
  position: "relative",
  display: "inline-block",
});

export const timeoutGuide = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  color: "#fff",
  textAlign: "center",
  padding: "3px",
  fontSize: "11px",
  borderRadius: "4px 4px 0 0",
  zIndex: 10,
  lineHeight: "16px",
});
