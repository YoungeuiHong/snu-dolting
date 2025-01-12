import { style } from "@vanilla-extract/css";

export const chatContainer = style({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
});

export const noResultContainer = style({
  height: "calc(100dvh - 80px)",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const noResultMessage = style({
  fontSize: "14px",
  fontWeight: 400,
});

export const chatRoomContainer = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  borderTop: "1px solid #8a8a8a1a",
  borderBottom: "1px solid #8a8a8a1a",
  padding: "14px",
  gap: "10px",
  background: "white",
  width: "100%",
  overflow: "hidden",
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "4px",
  flex: "1 1 auto",
  minWidth: "0",
  overflow: "hidden",
});

export const textTopContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "10px",
});

export const textBottomContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "10px",
  overflow: "hidden",
});

export const nickname = style({
  color: "#424242",
  fontWeight: 500,
  fontSize: "15px",
  flexGrow: 1,
});

export const createdAt = style({
  color: "#424242",
  fontWeight: 400,
  fontSize: "13px",
});

export const recentMessage = style({
  color: "#424242",
  fontWeight: 400,
  fontSize: "14px",
  flex: "1",
  minWidth: "0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const unreadCount = style({
  background: "#f44336",
  color: "white",
  width: "20px",
  height: "20px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "13px",
  flexShrink: 0,
});
