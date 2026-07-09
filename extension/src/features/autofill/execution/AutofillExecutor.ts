import { VisaProfile } from '../../profile/types/profile';
import { AutofillReport } from '../types/types';
import { ResultReporter } from '../engine/ResultReporter';
import { ExecutionLogger } from './ExecutionLogger';

export const AutofillExecutor = {
  execute: async (profile: VisaProfile): Promise<AutofillReport> => {
    ExecutionLogger.log('Starting autofill execution for applicant:', profile.surname);
    try {
      const report = await ResultReporter.runAutofill(profile);
      ExecutionLogger.log('Autofill execution report returned successfully:', report);
      return report;
    } catch (err) {
      ExecutionLogger.error('Autofill execution threw failure:', err);
      throw err;
    }
  },
};
