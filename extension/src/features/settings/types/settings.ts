export type ThemeMode = 'light' | 'dark' | 'system';
export type LanguageMode = 'en' | 'bn' | 'system';

export interface UserSettings {
  general: {
    language: LanguageMode;
    autoLoadLastActiveProfile: boolean;
    rememberLastPage: boolean;
  };
  appearance: {
    theme: ThemeMode;
    compactMode: boolean;
    enableAnimations: boolean;
  };
  autofill: {
    enableConfirmation: boolean;
    enableSmartMatching: boolean;
    highlightFilledFields: boolean;
    scrollToFirstField: boolean;
    showSummary: boolean;
  };
  advanced: {
    enableDebugMode: boolean;
    enablePerformanceMode: boolean;
    enableExperimentalFeatures: boolean;
  };
}
