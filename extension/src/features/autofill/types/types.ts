import { VisaProfile } from '../../profile/types/profile';

export interface AutofillMessage {
  action: 'AUTOFILL';
  profile: VisaProfile;
}

export interface AutofillReport {
  filled: number;
  skipped: number;
  failed: number;
  timeMs: number;
}
