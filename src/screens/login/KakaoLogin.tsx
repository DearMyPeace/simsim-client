import React from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import { fontBasic } from '@utils/Sizing';
import useSendUserToken from '@hooks/login/useSendUserToken';
import MyText from '@components/common/MyText';
import kakaoIcon from '@assets/logo/katalk.png';
import { ILoginProps } from '@type/Login';

const KakaoLogin = ({ handleLoginPress }: ILoginProps) => {
  const sendUserToken = useSendUserToken('apple');

  const KakaoSignIn = async () => {};

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
