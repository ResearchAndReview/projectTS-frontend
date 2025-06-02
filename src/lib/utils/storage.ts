type StorageKey = 'displayMode';

export const saveToStorage = <T>(key: StorageKey, value: T): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve();
    });
  });
};

export const loadFromStorage = <T>(key: StorageKey): Promise<T | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve(result[key]);
    });
  });
};

export const removeFromStorage = (key: StorageKey): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove([key], () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve();
    });
  });
};
