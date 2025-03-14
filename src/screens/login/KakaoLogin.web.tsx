import React, { useEffect } from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import { fontBasic } from '@utils/Sizing';
import useSendUserToken from '@hooks/login/useSendUserToken';
import MyText from '@components/common/MyText';
import kakaoIcon from '@assets/logo/katalk.png';
import { ILoginProps } from '@type/Login';
import { login, KakaoOAuthWebToken } from '@react-native-seoul/kakao-login';

const KakaoLogin = ({ handleLoginPress }: ILoginProps) => {
  const sendUserToken = useSendUserToken('kakao');
  const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
  const REST_API_KEY = process.env.KAKAO_REST_API_KEY;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    if (!code) return;
    const signInWithKakao = async (): Promise<void> => {
      try {
        const { access_token }: KakaoOAuthWebToken = await login({
          restApiKeyWeb: REST_API_KEY,
          redirectUrlWeb: REDIRECT_URI,
          codeWeb: code,
        });
        // TODO: 백엔드 api 완성 후 확인
        // sendUserToken.mutate({ access_token });
      } catch (error) {
        console.error(error);
      } finally {
        // url 초기화
        window.history.replaceState(null, '', REDIRECT_URI);
      }
    };
    signInWithKakao();
  }, []);

  const KakaoSignIn = async () => {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <Pressable style={styles.loginButton} onPress={() => handleLoginPress(KakaoSignIn)}>
      <View style={styles.iconAndText}>
        <Image source={kakaoIcon} style={styles.icon} />
        <MyText style={styles.loginButtonText}>Kakao로 계속하기</MyText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: 200,
    height: 42,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  loginButtonText: {
    fontSize: fontBasic,
  },
});

export default KakaoLogin;
