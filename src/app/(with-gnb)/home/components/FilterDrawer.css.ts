import { globalStyle, style } from "@vanilla-extract/css";
import { blackRoundButton } from "@/app/shared.css";

// 필터 제목
export const filterTitle = style({
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
  padding: "20px 0 8px 0",
  color: "#242729",
});

// 범위 입력 컨테이너
export const rangeContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "3px",
  width: "100%",
  boxSizing: "border-box",
});

// 숫자 입력 필드
export const numberInput = style({
  width: "120px",
  padding: "7px",
  border: "1px solid #eeeeee",
  borderRadius: "4px",
  touchAction: "manipulation",
  fontSize: "16px",

  ":focus": {
    outline: "none",
    borderColor: "#e0e0e0",
  },
  ":hover": {
    borderColor: "#e0e0e0",
  },
  "::placeholder": {
    fontSize: "13px",
  },
});

// 범위 표시 (-)
export const rangeIndicator = style({
  color: "#e0e0e0",
});

// 라디오 버튼 컨테이너
export const radioContainer = style({
  display: "flex",
  gap: "15px",
  margin: "5px 0",
});

// 라디오 버튼 라벨
export const radioLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "13px",
  fontWeight: 400,
  color: "#666666",
});

// 라디오 버튼 스타일
export const radioInput = style({
  appearance: "none",
  width: "14px",
  height: "14px",
  border: "1px solid #ccc",
  borderRadius: "50%",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  outline: "none",
});

// 라디오 버튼 선택된 경우 스타일
globalStyle(`${radioInput}:checked + span`, {
  color: "#000000",
  fontWeight: 500,
});

globalStyle(`${radioInput}:checked::after`, {
  content: '""',
  width: "8px",
  height: "8px",
  backgroundColor: "#242729",
  borderRadius: "50%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

// 체크박스 라벨
export const checkboxLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "13px",
  fontWeight: 400,
  color: "#666666",
});

// 체크박스 스타일
export const checkboxInput = style({
  appearance: "none",
  width: "14px",
  height: "14px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  outline: "none",
});

// 체크박스 선택된 경우 스타일
globalStyle(`${checkboxInput}:checked + span`, {
  color: "#242729",
  fontWeight: 500,
});

globalStyle(`${checkboxInput}:checked::after`, {
  content: '""',
  width: "8px",
  height: "8px",
  backgroundColor: "#242729",
  borderRadius: "2px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

// 버튼 컨테이너
export const buttonContainer = style({
  display: "flex",
  alignItems: "center",
  marginTop: "30px",
  gap: "10px",
});

// 초기화 버튼
export const initButton = style({
  width: "100px",
  height: "40px",
  border: "1px solid #242729",
  background: "white",
  borderRadius: "4px",
  color: "#242729",
});

// 적용하기 버튼
export const applyButton = style([
  blackRoundButton,
  {
    borderRadius: "4px",
    fontWeight: 400,
    height: "40px",
    padding: 0,
    fontSize: "14px",
  },
]);
