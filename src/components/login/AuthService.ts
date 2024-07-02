import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'authToken';

export const saveToken = async (token: string) => {
  try {
    await EncryptedStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Failed to save token in encrypted storage', e);
  }
};

export const getToken = async () => {
  try {
    const token = await EncryptedStorage.getItem(TOKEN_KEY);
    return token;
  } catch (e) {
    console.error('Failed to load token from encrypted storage', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await EncryptedStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove token from encrypted storage', e);
  }
};
