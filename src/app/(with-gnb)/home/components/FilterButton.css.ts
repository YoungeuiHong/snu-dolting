import { style } from "@vanilla-extract/css";

export const stickyHeader = style({
  position: "fixed",
  width: "100%",
  maxWidth: "900px",
  margin: "auto",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  background: "#F1F4F6",
  padding: "20px 20px 10px 20px",
});

export const filterContainer = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const filterButton = style({
  position: "relative",
  background: "white",
  border: "none",
  borderRadius: "100px",
  width: "30px",
  height: "30px",
  boxShadow: "0px 4px 10px 0px #0000000D",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const activeFilterBadge = style({
  position: "absolute",
  top: 5,
  right: 5,
  width: "4px",
  height: "4px",
  background: "blue",
  borderRadius: "10px",
});
