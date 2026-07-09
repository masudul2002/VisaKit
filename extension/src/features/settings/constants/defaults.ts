import { UserSettings } from '../types/settings';

export const DEFAULT_SETTINGS: UserSettings = {
  general: {
    language: 'system',
    autoLoadLastActiveProfile: true,
    rememberLastPage: true,
  },
  appearance: {
    theme: 'system',
    compactMode: false,
    enableAnimations: true,
  },
  autofill: {
    enableConfirmation: true,
    enableSmartMatching: true,
    highlightFilledFields: true,
    scrollToFirstField: true,
    showSummary: true,
  },
  advanced: {
    enableDebugMode: false,
    enablePerformanceMode: true,
    enableExperimentalFeatures: false,
  },
};
