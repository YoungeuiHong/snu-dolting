import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  height: "calc(100dvh - 52px)",
});

export const contentContainer = style({
  flexGrow: 1,
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
  background: "white",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: "0 16px",
  width: "100%",
  maxWidth: "900px",
  height: "calc(100dvh - 52px)",
  margin: "auto",
  marginTop: "52px",
  boxSizing: "border-box",
});

export const exitButton = style({
  border: "1px solid #424242",
  backgroundColor: "#ffffff",
  color: "#424242",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: 500,
  padding: "7px 16px",
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

export const titleWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "8px 0 24px 8px",
  gap: "5px",
});

export const title = style({
  fontSize: "22px",
  lineHeight: "29px",
  color: "#292b2b",
  fontWeight: 700,
});

export const subtitle = style({
  fontSize: "14px",
  color: "#828A8F",
  fontWeight: 400,
});

export const textField = style({
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

export const textArea = style([
  textField,
  {
    minHeight: "55dvh",
    padding: "16px",
    resize: "none",
    height: "auto",
    lineHeight: "24px",
  },
]);
export const textAreaWrapper = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const textAreaCounter = style({
  fontSize: "13px",
  color: "#828A8F",
  textAlign: "right",
  margin: "4px 8px 0 0",
});

export const errorMessage = style({
  color: "#ef4444",
  fontSize: "13px",
  margin: "4px 0 0 8px",
});

export const actionBar = style({
  position: "sticky",
  bottom: 0,
  left: "50%",
  background: "white",
  width: "100%",
  maxWidth: "900px",
  paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
  boxSizing: "border-box",
  transition: "bottom 0.2s ease-in-out",
});

export const nextButton = style({
  width: "100%",
  height: "48px",
  margin: "auto",
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

export const inputWrapperWithUnit = style({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

export const unitLabel = style({
  position: "absolute",
  right: "16px",
  fontSize: "14px",
  color: "#828A8F",
  pointerEvents: "none",
});

export const imageUploadButton = style({
  width: "100px",
  height: "100px",
  borderRadius: "10px",
  backgroundColor: "#e0e0e0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const profileImageContainer = style({
  position: "relative",
  width: "100%",
  height: "40dvh",
  marginTop: "10px",
});

export const uploadLoading = style({
  width: "100%",
  height: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  fontSize: "13px",
  color: "#757575",
});
