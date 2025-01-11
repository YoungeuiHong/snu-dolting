export const isServerError = (e: unknown) => {
  return (
    e !== null &&
    typeof e === "object" &&
    "environmentName" in e &&
    e.environmentName === "Server"
  );
};
