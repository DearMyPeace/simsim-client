import instance from '@api/axios';

export const logoutRequest = async () => {
  const response = await instance.delete('/auth/logout');
  return response;
};

export const deleteAccountRequest = async () => {
  const response = await instance.delete('/auth/delete');
  return response;
};
