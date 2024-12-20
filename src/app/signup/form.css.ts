import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  paddingTop: "52px",
  width: "100%",
  boxSizing: "border-box",
});

export const header = style({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "52px",
  padding: "0 12px",
  boxSizing: "border-box",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: "0 16px",
  width: "100%",
  maxWidth: "900px",
  margin: "auto",
  boxSizing: "border-box",
});

export const formWrapper = style({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  margin: "8px 0 16px 0",
});

export const formLabel = style({
  color: "#828A8F",
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: "16px",
  margin: "0 0 4px 8px",
});

export const title = style({
  fontSize: "22px",
  lineHeight: "29px",
  fontFamily: "Pretendard",
  color: "#292b2b",
  fontWeight: 700,
  paddingLeft: "8px",
  margin: "12px 0 24px 0",
});

export const textField = style({
  fontFamily: "Pretendard",
  fontSize: "16px",
  lineHeight: "18px",
  color: "#424242",
  borderRadius: "8px",
  border: "2px solid #eeeeee",
  width: "100%",
  height: "48px",
  padding: "0 16px",
  boxSizing: "border-box",
  ":focus": {
    outline: "none",
    borderColor: "#e0e0e0",
  },
  ":hover": {
    borderColor: "#e0e0e0",
  },
});

export const textFieldError = style({
  borderColor: "#ef4444",
  ":focus": {
    outline: "none",
    borderColor: "#ef4444",
  },
});

export const errorMessage = style({
  color: "#ef4444",
  fontSize: "13px",
  margin: "4px 0 0 8px",
});

export const actionBar = style({
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "900px",
  padding: "12px",
  boxSizing: "border-box",
});

export const nextButton = style({
  width: "100%",
  height: "48px",
  background: "#242729",
  color: "white",
  fontSize: "16px",
  fontWeight: 700,
  borderRadius: "24px",
  padding: "14px 24px",
  border: "none",
});

export const binaryChoiceContainer = style({
  display: "flex",
  width: "100%",
});

export const binaryChoiceLabel = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "44px",
  fontSize: "16px",
  fontWeight: 500,
  color: "#333",
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  cursor: "pointer",
  textAlign: "center",
  transition: "background-color 0.2s, color 0.2s",
  overflow: "hidden",
  boxSizing: "border-box",
  selectors: {
    "&:first-child": {
      borderRadius: "8px 0 0 8px",
      borderRightWidth: "0.5px",
    },
    "&:last-child": {
      borderRadius: "0 8px 8px 0",
      borderLeftWidth: "0.5px",
    },
  },
});

export const hiddenInput = style({
  display: "none",
});

globalStyle("input[type='radio']:checked + span", {
  width: "100%",
  height: "100%",
  backgroundColor: "#242729",
  color: "white",
  outline: "1px solid #242729",
  verticalAlign: "center",
  lineHeight: "44px",
  fontWeight: 600,
});

globalStyle(`.${binaryChoiceContainer}.${textFieldError}`, {
  borderColor: "#ef4444",
});
