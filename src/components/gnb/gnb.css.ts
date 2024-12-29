import { style } from "@vanilla-extract/css";
import { bottomBar } from "@/app/shared.css";

export const gnbContainer = style([
  bottomBar,
  {
    padding: "0 16px !important",
    borderTop: "1px solid #8a8a8a1a",
    background: "white",
    zIndex: 300,
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
]);

export const gnbButton = style({
  display: "flex",
  flexDirection: "column",
  flexBasis: "25%",
  justifyContent: "center",
  alignItems: "center",
  height: "52px",
});
