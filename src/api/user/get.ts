import instance from '@api/axios';
import { useQuery } from '@tanstack/react-query';

export const getMyUserInfo = async () => {
  const response = await instance.get('/user/me');
  return response.data;
};

export const useUserInfo = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getMyUserInfo,
    enabled: isLoggedIn,
  });
};
