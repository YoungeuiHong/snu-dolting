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
  borderRadius: "100px",
  objectFit: "cover",
  backgroundPosition: "center center",
});

export const userInfo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export const userName = style({
  fontWeight: 700,
  color: "#292b2b",
  fontSize: "14px",
  lineHeight: "22px",
});

export const userIntroduction = style({
  fontWeight: 400,
  color: "#292b2b",
  fontSize: "14px",
  lineHeight: "22px",
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
});
