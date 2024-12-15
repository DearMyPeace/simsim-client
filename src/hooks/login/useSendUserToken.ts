import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserGoogleToken, postUserAppleToken, postUserKakaoToken } from '@api/login/post';
import { saveToken } from '@components/login/AuthService';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@stores/login';
import { GoogleTokenData, AppleData, KakaoTokenData } from '@type/Login';

const useSendUserToken = (loginType: 'google' | 'apple' | 'kakao') => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoogleTokenData | AppleData | KakaoTokenData) => {
      switch (loginType) {
        case 'google':
          return postUserGoogleToken({ access_token: (data as GoogleTokenData).access_token });
        case 'apple':
          return postUserAppleToken(data as AppleData);
        case 'kakao':
          return postUserKakaoToken(data as KakaoTokenData);
      }
    },
    onSuccess: async (data) => {
      await saveToken(data.accessToken);
      setIsLoggedIn(true);
      queryClient.resetQueries();
    },
    onError: (error) => {
      console.error(error.response.data.message);
    },
  });
};

export default useSendUserToken;
