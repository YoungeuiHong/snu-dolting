export const numToString = (
  value: number | null | undefined,
): string | null | undefined => {
  return typeof value === "number" ? value.toString() : value;
};

export function booleanToString(
  value: boolean | null | undefined,
): "true" | "false" | null {
  if (value === true) return "true";
  if (value === false) return "false";
  return null;
}

export function stringToBoolean(
  value: string | null | undefined,
): boolean | null {
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}
