import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100dvw",
  height: "100dvh",
  padding: "30px",
});

export const wrapper = style({
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  width: "100%",
  maxWidth: "500px",
  gap: "10px",
});

export const lottieWrapper = style({
  height: "90px",
});

export const errorTitle = style({
  color: "#424242",
  fontSize: "20px",
});

export const errorMessage = style({
  maxWidth: "500px",
  width: "100%",
  maxHeight: "100px",
  overflowY: "scroll",
  whiteSpace: "normal",
  padding: "5px",
  fontSize: "15px",
  textAlign: "center",
});

export const buttonContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "5px",
  gap: "5px",
});

const button = style({
  width: "100%",
  height: "50px",
  fontSize: "15px",
  fontWeight: 600,
  borderRadius: "10px",
});

export const retryButton = style([
  button,
  {
    backgroundColor: "#FF9411",
    border: "none",
    color: "white",
  },
]);

export const homeButton = style([
  button,
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    backgroundColor: "white",
    border: "1px solid #FF9411",
    color: "#FF9411",
  },
]);
