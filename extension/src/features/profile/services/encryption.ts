const ENCRYPTION_SALT = 'visakit-crypto-salt';

async function deriveKey(passcode: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passcode),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode(ENCRYPTION_SALT),
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export const encryptionService = {
  encrypt: async (text: string, passcode: string): Promise<string> => {
    try {
      const key = await deriveKey(passcode);
      const enc = new TextEncoder();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        enc.encode(text)
      );

      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encrypted), iv.length);

      return Array.from(combined)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    } catch (err) {
      console.error('Encryption failed:', err);
      throw new Error('Encryption failed.');
    }
  },

  decrypt: async (hex: string, passcode: string): Promise<string> => {
    try {
      const key = await deriveKey(passcode);
      const combined = new Uint8Array(
        hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
      );

      const iv = combined.slice(0, 12);
      const data = combined.slice(12);

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        data
      );

      const dec = new TextDecoder();
      return dec.decode(decrypted);
    } catch (err) {
      console.error('Decryption failed:', err);
      throw new Error('Incorrect passcode or corrupted data.');
    }
  },
};
