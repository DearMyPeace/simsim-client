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
      // console.log('onSuccess data:', data); // 서버 응답 확인
      if (!data.accessToken) {
        console.error('No accessToken in response');
        return;
      }
      await saveToken(data.accessToken);
      console.log('AccessToken saved successfully');
      setIsLoggedIn(true); // 로그인 상태 업데이트
      queryClient.resetQueries();
    },
    onError: (error) => {
      if (error?.response?.data?.message) {
        console.error('Error message:', error.response.data.message);
      } else {
        console.error('Unexpected error:', error);
      }
    },
  });
};

export default useSendUserToken;
