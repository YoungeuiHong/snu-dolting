import { style } from "@vanilla-extract/css";

export const chatContainer = style({
  width: "100%",
  maxWidth: "900px",
  height: "100dvh",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  background: "white",
});

export const chatHeader = style({
  display: "flex",
  borderBottom: "1px solid #eeeeee",
  gap: "10px",
  alignItems: "center",
  padding: "20px 10px 10px 10px",
  height: "60px",
  background: "white",
});

export const nickname = style({
  fontWeight: 500,
  fontSize: "15px",
  color: "#424242",
});

export const inputContainer = style({
  position: "sticky",
  left: 0,
  bottom: 0,
  display: "flex",
  gap: "10px",
  width: "100%",
  padding: "10px 10px calc(env(safe-area-inset-bottom, 0px) + 10px) 10px",
  borderTop: "1px solid #eeeeee",
  backgroundColor: "white",
});

export const messageContainer = style({
  width: "100%",
  flexGrow: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "0 20px",
});

export const messageMeWrapper = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  gap: "5px",
});

export const messageOtherWrapper = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-end",
  gap: "5px",
});

export const message = style({
  position: "relative",
  padding: "12px",
  borderRadius: "18px",
  maxWidth: "70%",
  fontSize: "14px",
  textAlign: "left",
  whiteSpace: "pre-wrap",
});

export const messageMe = style([
  message,
  {
    backgroundColor: "#1474FF",
    color: "white",
    borderBottomRightRadius: "0px",
  },
]);

export const messageOther = style([
  message,
  {
    backgroundColor: "#E4E4E6",
    borderBottomLeftRadius: "0px",
    color: "#424242",
  },
]);

export const messageDate = style({
  textAlign: "center",
  margin: "15px 0",
  fontSize: "12px",
  color: "#999",
});

export const messageInfo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  paddingBottom: "5px",
  gap: "2px",
});

export const unreadMessage = style({
  fontSize: "9px",
  color: "#1474FF",
  fontWeight: 500,
});

export const messageTime = style({
  fontSize: "9px",
  color: "#666",
});

export const imageWrapper = style({
  maxWidth: "70%",
  height: "auto",
  borderRadius: "10px",
  overflow: "hidden",
  display: "block",
});
export const input = style({
  flexGrow: 1,
  borderRadius: "20px",
  border: "none",
  background: "#f5f5f5",
  padding: "12px 20px",
  fontSize: "16px",
  resize: "none",
  height: "43px",
  overflowY: "auto",

  ":focus": {
    outline: "none",
  },
});
