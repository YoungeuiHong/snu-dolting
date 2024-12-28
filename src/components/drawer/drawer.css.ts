import { style } from "@vanilla-extract/css";

export const overlayStyle = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100dvw",
  height: "100dvh",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  zIndex: 1000,
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease, visibility 0.3s ease",
});

export const overlayVisibleStyle = style({
  opacity: 1,
  visibility: "visible",
});

export const drawerStyle = style({
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translate(-50%, 100%)",
  width: "100%",
  maxWidth: "900px",
  maxHeight: "90vh",
  backgroundColor: "white",
  borderRadius: "16px 16px 0 0",
  boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)",
  zIndex: 1001,
  transition: "transform 0.3s ease",
});

export const drawerVisibleStyle = style({
  transform: "translate(-50%, 0)",
});

export const closeButtonStyle = style({
  position: "absolute",
  top: "12px",
  right: "20px",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "1.5rem",
  color: "#242729",
});
