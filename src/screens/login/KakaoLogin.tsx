import React from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import { fontBasic } from '@utils/Sizing';
import useSendUserToken from '@hooks/login/useSendUserToken';
import MyText from '@components/common/MyText';
import kakaoIcon from '@assets/logo/katalk.png';
import { ILoginProps } from '@type/Login';
import { login, KakaoOAuthToken } from '@react-native-seoul/kakao-login';

const KakaoLogin = ({ handleLoginPress }: ILoginProps) => {
  const sendUserToken = useSendUserToken('kakao');

  const signInWithKakao = async (): Promise<void> => {
    try {
      const { accessToken }: KakaoOAuthToken = await login();
      console.log('Kakao login response:', accessToken);
      // TODO: 백엔드 api 완성 후 확인
      // sendUserToken.mutate({ access_token: accessToken });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable style={styles.loginButton} onPress={() => handleLoginPress(signInWithKakao)}>
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
