export const SupportedPageChecker = {
  isSupported: (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.includes('indianvisaonline.gov.in');
    } catch {
      return url.includes('indianvisaonline.gov.in');
    }
  },
};
