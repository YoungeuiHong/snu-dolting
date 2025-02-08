import { style } from "@vanilla-extract/css";

export const userCard = style({
  width: "100%",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 4px 10px 0px #0000000D",
  background: "white",
});

export const userCardHeader = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "15px",
  alignItems: "center",
  padding: "20px",
});

export const profileImage = style({
  width: "50px",
  height: "50px",
});

export const userInfo = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  overflow: "hidden",
});

export const userName = style({
  fontWeight: 700,
  color: "#292b2b",
  fontSize: "14px",
  lineHeight: "22px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
});

export const userIntroduction = style({
  fontWeight: 400,
  color: "#292b2b",
  fontSize: "14px",
  lineHeight: "22px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
});

export const userCardDetails = style({
  padding: "0 20px 20px 20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto auto auto",
  gap: "5px",
});

export const userDetail = style({
  fontWeight: 400,
  fontSize: "13px",
  color: "#828A8F",
  lineHeight: "24px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
