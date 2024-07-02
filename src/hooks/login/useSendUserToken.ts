import { useMutation } from '@tanstack/react-query';
import { postUserGoogleToken, postUserAppleToken } from '@api/login/post';
import { saveToken } from '@components/login/AuthService';
import { useSetRecoilState } from 'recoil';
import { authTokenState, userInfoState, isLoggedInState } from '@stores/login';

interface AppleData {
  authorization: string;
  user: string | undefined;
}

interface GoogleTokenData {
  token: string;
}

const useSendUserToken = (loginType: 'google' | 'apple') => {
  const setAuthToken = useSetRecoilState(authTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const mutationFn = loginType === 'google' ? postUserGoogleToken : postUserAppleToken;

  return useMutation({
    mutationFn: (data: GoogleTokenData | AppleData) => mutationFn(data),
    onSuccess: async (data) => {
      await saveToken(data.accessToken);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.error(error.response.data.message);
    },
  });
};

export default useSendUserToken;
