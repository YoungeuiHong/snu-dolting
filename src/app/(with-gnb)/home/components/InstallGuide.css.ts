import { style } from "@vanilla-extract/css";

export const bubbleContainer = style({
  position: "fixed",
  bottom: "65px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "12px 35px",
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  color: "#333",
  fontSize: "14px",
  textAlign: "center",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  maxWidth: "90%",
  flexDirection: "column",
  gap: "5px",
});

export const rowContainer = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
});

export const closeButton = style({
  position: "absolute",
  top: "8px",
  right: "8px",
  width: "20px",
  height: "20px",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const closeIconLine = style({
  position: "absolute",
  width: "14px",
  height: "2px",
  backgroundColor: "#999",
  transition: "background-color 0.2s",
  ":first-child": {
    transform: "rotate(45deg)",
  },
  ":last-child": {
    transform: "rotate(-45deg)",
  },

  ":hover": {
    backgroundColor: "#333",
  },
});
