import { style } from "@vanilla-extract/css";

export const layoutContainer = style({
  width: "100%",
  maxWidth: "900px",
  minHeight: "100vh",
  padding: "20px 20px 60px 20px",
  backgroundColor: "#F1F4F6",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  margin: "auto",
  overscrollBehavior: "none",
});
