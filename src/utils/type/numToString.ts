export const numToString = (
  value: number | null | undefined,
): string | null | undefined => {
  return typeof value === "number" ? value.toString() : value;
};
