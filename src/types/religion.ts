export type Religion =
  | "none"
  | "catholic"
  | "christianity"
  | "buddhism"
  | "etc";

export const ReligionLabels: Record<Religion, string> = {
  none: "무교",
  catholic: "천주교",
  christianity: "기독교",
  buddhism: "불교",
  etc: "기타 종교",
};
