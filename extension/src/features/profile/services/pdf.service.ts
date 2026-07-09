import { VisaProfile } from '../types/profile';

export const pdfService = {
  extractTextFromPdfBuffer: (buffer: ArrayBuffer): string => {
    const chars = new Uint8Array(buffer);
    let text = '';
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if ((char >= 32 && char <= 126) || char === 10 || char === 13) {
        text += String.fromCharCode(char);
      } else {
        text += ' ';
      }
    }
    return text;
  },

  parsePdfProfile: (pdfText: string): Partial<VisaProfile> => {
    const profile: Partial<VisaProfile> = {};

    // Passport extraction
    const passportMatch =
      pdfText.match(/PASSPORT\s*NO[.:\s]+([A-Z0-9]{6,12})/i) ||
      pdfText.match(/Passport\s*Number[.:\s]+([A-Z0-9]{6,12})/i) ||
      pdfText.match(/([A-Z][0-9]{7,8})/);
    if (passportMatch) {
      profile.passportNumber = passportMatch[1];
    }

    // Surname extraction
    const surnameMatch =
      pdfText.match(/SURNAME[.:\s]+([A-Z\s]+)/i) ||
      pdfText.match(/Surname[.:\s]+([A-Z\s]+)/i) ||
      pdfText.match(/Last\s*Name[.:\s]+([A-Z\s]+)/i);
    if (surnameMatch) {
      profile.surname = surnameMatch[1].trim();
    }

    // Given name extraction
    const givenNameMatch =
      pdfText.match(/GIVEN\s*NAME[.:\s]+([A-Z\s]+)/i) ||
      pdfText.match(/Given\s*Name[.:\s]+([A-Z\s]+)/i) ||
      pdfText.match(/First\s*Name[.:\s]+([A-Z\s]+)/i);
    if (givenNameMatch) {
      profile.givenName = givenNameMatch[1].trim();
    }

    // Contact details
    const emailMatch = pdfText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      profile.email = emailMatch[1];
    }

    const phoneMatch = pdfText.match(/(?:PHONE|MOBILE|TEL)[.:\s]+([+0-9\s-]{7,15})/i);
    if (phoneMatch) {
      profile.phone = phoneMatch[1].trim();
    }

    return profile;
  },
};
