import { Platform } from 'react-native';

const TOKEN_KEY = 'authToken';

const saveToken = async (token) => {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error('Failed to save token in web storage', e);
    }
  } else {
    try {
      const EncryptedStorage = (await import('react-native-encrypted-storage')).default;
      await EncryptedStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error('Failed to save token in encrypted storage', e);
    }
  }
};

const getToken = async () => {
  if (Platform.OS === 'web') {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      return token;
    } catch (e) {
      console.error('Failed to load token from web storage', e);
      return null;
    }
  } else {
    try {
      const EncryptedStorage = (await import('react-native-encrypted-storage')).default;
      const token = await EncryptedStorage.getItem(TOKEN_KEY);
      return token;
    } catch (e) {
      console.error('Failed to load token from encrypted storage', e);
      return null;
    }
  }
};

const removeToken = async () => {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error('Failed to remove token from web storage', e);
    }
  } else {
    try {
      const EncryptedStorage = (await import('react-native-encrypted-storage')).default;
      await EncryptedStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error('Failed to remove token from encrypted storage', e);
    }
  }
};

export { saveToken, getToken, removeToken };
