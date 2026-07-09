export interface ParsedMRZ {
  passportNumber: string;
  surname: string;
  givenName: string;
  nationality: string;
  dob: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE' | 'TRANSGENDER';
  expiryDate: string; // YYYY-MM-DD
  issueDate?: string;
  isValid: boolean;
}

export const mrzService = {
  calculateChecksum: (str: string): number => {
    const weights = [7, 3, 1];
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      let val = 0;
      if (char >= '0' && char <= '9') {
        val = char.charCodeAt(0) - 48;
      } else if (char >= 'A' && char <= 'Z') {
        val = char.charCodeAt(0) - 55;
      } else if (char === '<') {
        val = 0;
      }
      sum += val * weights[i % 3];
    }
    return sum % 10;
  },

  parseMRZ: (line1: string, line2: string): ParsedMRZ | null => {
    if (line1.length !== 44 || line2.length !== 44) return null;

    try {
      // Line 1 details
      const namePart = line1.substring(5);
      const nameSplit = namePart.split('<<');
      const surname = nameSplit[0]?.replace(/</g, ' ').trim() || '';
      const givenName = nameSplit[1]?.replace(/</g, ' ').trim() || '';

      // Line 2 details
      const passportNumber = line2.substring(0, 9).replace(/</g, '');
      const passportCheck = parseInt(line2.substring(9, 10), 10);
      const nationality = line2.substring(10, 13).replace(/</g, '');

      const dobStr = line2.substring(13, 19);
      const dobCheck = parseInt(line2.substring(19, 20), 10);

      const genderStr = line2.substring(20, 21);
      const expiryStr = line2.substring(21, 27);
      const expiryCheck = parseInt(line2.substring(27, 28), 10);

      // Verify checksums
      const isPassportValid = mrzService.calculateChecksum(line2.substring(0, 9)) === passportCheck;
      const isDobValid = mrzService.calculateChecksum(dobStr) === dobCheck;
      const isExpiryValid = mrzService.calculateChecksum(expiryStr) === expiryCheck;

      // Date Conversions (YYMMDD -> YYYY-MM-DD)
      const parseYear = (yy: string, isPast: boolean) => {
        const currentYear = new Date().getFullYear() % 100;
        const yearNum = parseInt(yy, 10);
        const century = yearNum > currentYear && isPast ? 1900 : 2000;
        return century + yearNum;
      };

      const dobYear = parseYear(dobStr.substring(0, 2), true);
      const dob = `${dobYear}-${dobStr.substring(2, 4)}-${dobStr.substring(4, 6)}`;

      const expYear = parseYear(expiryStr.substring(0, 2), false);
      const expiryDate = `${expYear}-${expiryStr.substring(2, 4)}-${expiryStr.substring(4, 6)}`;

      const gender: 'MALE' | 'FEMALE' | 'TRANSGENDER' =
        genderStr === 'F' ? 'FEMALE' : genderStr === 'M' ? 'MALE' : 'TRANSGENDER';

      return {
        passportNumber,
        surname,
        givenName,
        nationality,
        dob,
        gender,
        expiryDate,
        isValid: isPassportValid && isDobValid && isExpiryValid,
      };
    } catch {
      return null;
    }
  },
};
