/**
 * VisaKit Content Script
 */
import { ResultReporter } from '../features/autofill/engine/ResultReporter';
import { AutofillMessage } from '../features/autofill/types/types';

console.log('[VisaKit] Content script loaded.');

chrome.runtime.onMessage.addListener((message: AutofillMessage, _sender, sendResponse) => {
  if (message.action === 'AUTOFILL') {
    ResultReporter.runAutofill(message.profile)
      .then((report) => {
        sendResponse(report);
      })
      .catch((err) => {
        console.error('[VisaKit] Autofill engine execution failure:', err);
        sendResponse({
          filled: 0,
          skipped: 0,
          failed: 1,
          timeMs: 0,
        });
      });
    return true; // Asynchronous callback
  }
});
