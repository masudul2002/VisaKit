import { VisaProfile } from '../../profile/types/profile';
import { AutofillReport } from '../types/types';
import { DOMScanner } from './DOMScanner';
import { FieldMapper } from './FieldMapper';
import { ValueResolver } from './ValueResolver';
import { FormFiller } from './FormFiller';
import { Logger } from './Logger';

export const ResultReporter = {
  runAutofill: async (profile: VisaProfile): Promise<AutofillReport> => {
    const startTime = performance.now();
    let filled = 0;
    let skipped = 0;
    let failed = 0;
    let matched = 0;

    try {
      Logger.info('Autofill engine started scanning DOM.');
      const elements = DOMScanner.scan();
      Logger.info(`Found ${elements.length} potential form fields.`);

      for (const el of elements) {
        try {
          const key = FieldMapper.mapField(el);
          if (!key) {
            skipped++;
            continue;
          }
          matched++;

          const resolvedVal = ValueResolver.resolveValue(el, key, profile);
          if (resolvedVal === null || resolvedVal === undefined) {
            skipped++;
            continue;
          }

          const didFill = FormFiller.fill(el, resolvedVal);
          if (didFill) {
            filled++;
          } else {
            skipped++;
          }
        } catch (fieldError) {
          Logger.error('Failed to process individual form field:', fieldError);
          failed++;
        }
      }
    } catch (err) {
      Logger.error('Critical failure in autofill execution loop', err);
      failed = 1;
    }

    const elapsed = Math.round(performance.now() - startTime);
    Logger.info(
      `Autofill finished: ${matched} matched, ${filled} filled, ${skipped} skipped, ${failed} failed in ${elapsed}ms.`
    );

    return {
      matched,
      filled,
      skipped,
      failed,
      timeMs: elapsed,
    };
  },
};
