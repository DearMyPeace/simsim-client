export const saveCheckStatus = async (key: string, value: boolean) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save check status', e);
  }
};

export const getCheckStatus = async (key: string): Promise<boolean> => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : false;
  } catch (e) {
    console.error('Failed to load check status', e);
    return false;
  }
};
