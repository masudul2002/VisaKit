import { profileService } from '../../profile/services/profile.service';
import { SupportedPageDetector } from './SupportedPageDetector';
import { AutofillReport } from '../types/types';
import { activityService } from '../services/activity.service';

export const ExecutionController = {
  triggerAutofill: async (): Promise<AutofillReport> => {
    const profiles = await profileService.getAllProfiles();
    const activeProfile = profiles.find((p) => p.isDefault);
    if (!activeProfile) {
      throw new Error('No active profile selected. Please configure a default profile.');
    }

    if (typeof chrome === 'undefined' || !chrome.tabs) {
      throw new Error('Chrome tabs API is unavailable.');
    }
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      throw new Error('No active tab found.');
    }

    const url = tab.url || '';
    if (!SupportedPageDetector.isSupported(url)) {
      throw new Error(
        'Autofill is only supported on the official Indian Visa website (indianvisaonline.gov.in).'
      );
    }

    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(
        tab.id!,
        { action: 'AUTOFILL', profile: activeProfile },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(
              new Error(
                'Autofill script is not loaded on this tab. Please refresh the page and try again.'
              )
            );
            return;
          }
          if (response) {
            activityService
              .addLog({
                profileName: `${activeProfile.givenName} ${activeProfile.surname}`,
                url: tab.url || 'Unknown Portal',
                matched: response.matched !== undefined ? response.matched : response.filled,
                filled: response.filled,
                skipped: response.skipped,
                failed: response.failed,
                timeMs: response.timeMs,
              })
              .then(() => resolve(response))
              .catch(() => resolve(response));
          } else {
            reject(new Error('Form autofill engine returned an empty response.'));
          }
        }
      );
    });
  },
};
