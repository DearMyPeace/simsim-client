const TOKEN_KEY = 'authToken';

export const saveToken = async (token: string) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Failed to save token in web storage', e);
  }
};

export const getToken = async () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  } catch (e) {
    console.error('Failed to load token from web storage', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove token from web storage', e);
  }
};
