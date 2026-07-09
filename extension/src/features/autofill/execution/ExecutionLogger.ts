export const ExecutionLogger = {
  log: (msg: string, ...args: unknown[]) => {
    console.log(`[VisaKit Execution] ${msg}`, ...args);
  },
  error: (msg: string, ...args: unknown[]) => {
    console.error(`[VisaKit Execution Error] ${msg}`, ...args);
  },
};
