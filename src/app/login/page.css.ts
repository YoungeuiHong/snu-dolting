import { style } from "@vanilla-extract/css";

export const loginPageContainer = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
});

export const loginMessage = style({
  fontSize: "16px",
  color: "#424242",
  fontWeight: 400,
});

export const loginButton = style({
  textDecoration: "none",
  background: "#424242",
  padding: "10px 20px",
  color: "white",
  borderRadius: "10px",
  fontSize: "14px",
});
