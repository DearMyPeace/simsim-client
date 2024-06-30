import instance from '@api/axios';

export const postUserGoogleToken = async (data) => {
  const response = await instance.post('/auth/google', data);
  return response.data;
};

export const postUserAppleToken = async (data) => {
  const response = await instance.post('/auth/apple', data);
  return response.data;
};
