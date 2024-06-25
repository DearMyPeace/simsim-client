import instance from '@api/axios';

export const postUserToken = async (data) => {
  const response = await instance.post('/auth/google', data);
  return response.data;
};
