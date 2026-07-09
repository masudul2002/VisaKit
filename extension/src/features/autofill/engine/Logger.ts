export const Logger = {
  info: (message: string) => {
    console.log(`[VisaKit Info]: ${message}`);
  },
  warn: (message: string) => {
    console.warn(`[VisaKit Warning]: ${message}`);
  },
  error: (message: string, error?: unknown) => {
    console.error(`[VisaKit Error]: ${message}`, error);
  },
};
