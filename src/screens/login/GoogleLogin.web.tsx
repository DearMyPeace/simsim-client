// GoogleLoginWeb.tsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
import googleLogo from '@assets/logo/google.png';
import useSendUserToken from '@hooks/login/useSendUserToken';
import { ILoginProps } from '@type/Login';

const GoogleLoginWeb = ({ handleLoginPress }: ILoginProps) => {
  const sendUserToken = useSendUserToken('google');

  const login = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      sendUserToken.mutate({ access_token: tokenResponse.access_token });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return (
    <View>
      <Pressable style={styles.loginButton} onPress={() => handleLoginPress(login)}>
        <View style={styles.iconAndText}>
          <Image source={googleLogo} style={styles.icon} />
          <MyText style={styles.loginButtonText}>Google로 계속하기</MyText>
        </View>
      </Pressable>
    </View>
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
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#000',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  loginButtonText: {
    fontSize: 14,
    color: '#000',
  },
});

export default GoogleLoginWeb;
