export const storageService = {
  get: <T>(key: string): Promise<T | null> => {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get([key], (result) => {
          resolve((result[key] as T) || null);
        });
      } else {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            resolve(JSON.parse(item) as T);
          } catch {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }
    });
  },

  set: <T>(key: string, value: T): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ [key]: value }, () => {
          resolve();
        });
      } else {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      }
    });
  },

  remove: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.remove([key], () => {
          resolve();
        });
      } else {
        localStorage.removeItem(key);
        resolve();
      }
    });
  },
};
