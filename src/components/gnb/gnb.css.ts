import { style } from "@vanilla-extract/css";
import { bottomBar } from "@/app/shared.css";

export const gnbContainer = style([
  bottomBar,
  {
    paddingTop: "0px !important",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "env(safe-area-inset-bottom, 0px) !important",
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
  position: "relative",
});

export const badgeContainer = style({
  position: "relative",
  width: 20,
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const gnbBadge = style({
  position: "absolute",
  top: -5,
  right: -5,
  width: 10,
  height: 10,
  backgroundColor: "red",
  borderRadius: "50%",
  border: "2px solid white",
});
