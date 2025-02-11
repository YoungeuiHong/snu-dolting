import { style } from "@vanilla-extract/css";

export const mainContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "60px 20px calc(env(safe-area-inset-bottom, 0px) + 20px) 20px",
});
