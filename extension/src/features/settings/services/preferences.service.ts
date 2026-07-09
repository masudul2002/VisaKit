import { settingsService } from './settings.service';

export const preferencesService = {
  isAutofillConfirmationEnabled: async (): Promise<boolean> => {
    const s = await settingsService.getSettings();
    return s.autofill.enableConfirmation;
  },

  isHighlightFieldsEnabled: async (): Promise<boolean> => {
    const s = await settingsService.getSettings();
    return s.autofill.highlightFilledFields;
  },

  isScrollToFirstFieldEnabled: async (): Promise<boolean> => {
    const s = await settingsService.getSettings();
    return s.autofill.scrollToFirstField;
  },

  isDebugModeEnabled: async (): Promise<boolean> => {
    const s = await settingsService.getSettings();
    return s.advanced.enableDebugMode;
  },
};
