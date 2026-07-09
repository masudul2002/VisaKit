export const SupportedPageDetector = {
  isSupported: (url: string): boolean => {
    if (!url) return false;
    return url.includes('indianvisaonline.gov.in');
  },
};
