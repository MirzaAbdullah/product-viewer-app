export const logError = (error: any) => {
  // Token is expired, relogin is required
  console.error("ERROR:", error);
};

export const logWarn = (error: any) => {
  console.warn("WARN", error);
};

export const defaultLog = (error: any) => {
  console.log("LOG:", error);
};
