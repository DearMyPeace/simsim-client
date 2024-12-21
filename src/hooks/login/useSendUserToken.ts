import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserGoogleToken, postUserAppleToken } from '@api/login/post';
import { saveToken } from '@components/login/AuthService';
import { useSetRecoilState } from 'recoil';
import { authTokenState, userInfoState, isLoggedInState } from '@stores/login';

interface AppleData {
  authorization: string;
  user: string | undefined;
}

interface GoogleTokenData {
  access_token: string;
}

const useSendUserToken = (loginType: 'google' | 'apple') => {
  const setAuthToken = useSetRecoilState(authTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const queryClient = useQueryClient();

  const mutationFn = loginType === 'google' ? postUserGoogleToken : postUserAppleToken;

  return useMutation({
    mutationFn: (data: GoogleTokenData | AppleData) => {
      if (loginType === 'google') {
        // console.log('Google token:', data);
        return mutationFn({ access_token: (data as GoogleTokenData).access_token });
      } else {
        // console.log('Apple token:', data);
        return mutationFn(data);
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
