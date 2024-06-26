import { useSetRecoilState } from 'recoil';
import { authTokenState, isLoggedInState, userInfoState } from '@stores/login.ts';
import { removeToken } from '@components/login/AuthService.ts';

const useLogout = () => {
  const setAuthToken = useSetRecoilState(authTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  // TODO: Logout Test Code
  const handleLogout = async () => {
    setAuthToken(null);
    await removeToken();
    setUserInfo(null);
    setIsLoggedIn(false);
  };
  return { handleLogout };
};

export default useLogout;
