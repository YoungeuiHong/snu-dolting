import { style } from "@vanilla-extract/css";

export const container = style({
  height: "80dvh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const message = style({
  fontSize: "14px",
  fontWeight: 400,
});
