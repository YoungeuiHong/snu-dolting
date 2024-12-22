import { style } from "@vanilla-extract/css";
import { flexColumnCenter, fullSize } from "@/app/shared.css";

export const container = style([fullSize, flexColumnCenter]);

export const lottieContainer = style({
  height: "150px",
});

export const subTitle = style({
  color: "#828A8F",
  fontSize: "16px",
  fontWeight: 500,
  margin: "15px 0",
});

export const title = style({
  fontSize: "26px",
  lineHeight: "45px",
  color: "#292b2b",
  fontWeight: 700,
});
