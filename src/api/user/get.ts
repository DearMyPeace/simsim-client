import instance from '@api/axios';
import { useQuery } from '@tanstack/react-query';

const TEST_USER_ID = 1;
export const getMyUserInfo = async () => {
  const response = await instance.get(`/user/me/${TEST_USER_ID}`);
  return response.data;
};

export const useUserInfo = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getMyUserInfo,
    enabled: isLoggedIn,
  });
};
