import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCheckStatus = async (key: string, value: boolean) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save check status', e);
  }
};

export const getCheckStatus = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : false;
  } catch (e) {
    console.error('Failed to load check status', e);
    return false;
  }
};
