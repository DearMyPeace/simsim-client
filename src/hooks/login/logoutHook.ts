import { useSetRecoilState } from 'recoil';
import { authTokenState, isLoggedInState, userInfoState } from '@stores/login.ts';
import { removeToken } from '@components/login/AuthService.ts';
import { useMutation } from '@tanstack/react-query';
import instance from '@api/axios';

const logoutRequest = async () => {
  const response = await instance.delete('/auth/logout');
  return response;
};

const useLogout = () => {
  const setAuthToken = useSetRecoilState(authTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      console.log('Logout Success');
    },
    onError: (e) => {
      console.log(e, 'Logout Error');
    },
    onSettled: () => {
      handleLogout();
    },
  });

  // TODO: Logout Test Code
  const handleLogout = async () => {
    setAuthToken(null);
    await removeToken();
    setUserInfo(null);
    setIsLoggedIn(false);
  };
  return { logoutMutation };
};

export default useLogout;
