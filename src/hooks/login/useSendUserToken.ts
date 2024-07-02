// useSendUserToken.ts
import { useMutation } from '@tanstack/react-query';
import { postUserGoogleToken, postUserAppleToken } from '@api/login/post';
import { saveToken } from '@components/login/AuthService';
import { useRecoilState } from 'recoil';
import { authTokenState, userInfoState, isLoggedInState } from '@stores/login';

interface AppleData {
  authorization: string;
  user: string | undefined;
}

interface TokenData {
  token: string | AppleData;
  type: 'google' | 'apple';
}

const useSendUserToken = () => {
  const setAuthToken = useSetRecoilState(authTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  return useMutation({
    mutationFn: (data: TokenData) => {
      if (data.type === 'google') {
        return postUserGoogleToken(data);
      } else {
        return postUserAppleToken(data);
      }
    },
    onSuccess: async (data: { accessToken: string }) => {
      await saveToken(data.accessToken);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.error(error.response.data.message);
    },
  });
};

export default useSendUserToken;
