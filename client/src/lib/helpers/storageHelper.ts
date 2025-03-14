import { authStorageKeys, StorageKey } from "data/constants/authConstants";

export const getAuthStoredValue = (key: StorageKey) => {
  return window.localStorage.getItem(key);
};

export const setAuthStoredValue = (key: StorageKey, value: string) => {
  window.localStorage.setItem(key, value);
};

export const removeAuthStoredValue = (key: StorageKey) => {
  window.localStorage.removeItem(key);
};

export const clearAuthStoredData = () => {
  Object.values(authStorageKeys).forEach((key) =>
    window.localStorage.removeItem(key)
  );
};
