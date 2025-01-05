import { style } from "@vanilla-extract/css";

export const settingContainer = style({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  gap: "2px",
  color: "#424242",
});

export const itemContainer = style({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  background: "white",
  padding: "20px",
  fontSize: "14px",
});
