import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import MyText from '@components/common/MyText';
import googleLogo from '@assets/logo/google.png';
import { fontBasic } from '@utils/Sizing';
import useSendUserToken from '@hooks/login/useSendUserToken';

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_CLIENT_ID,
  iosClientId: process.env.IOS_GOOGLE_CLIENT_ID,
});

const GoogleLogin = ({ handleLoginPress }) => {
  const sendUserToken = useSendUserToken('google');

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const getToken = await GoogleSignin.getTokens();
      if (getToken) {
        sendUserToken.mutate({ access_token: getToken.accessToken });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleLoginPress(signInWithGoogle)}
      >
        <View style={styles.iconAndText}>
          <Image source={googleLogo} style={styles.icon} />
          <MyText style={styles.loginButtonText}>Google로 계속하기</MyText>
        </View>
      </TouchableOpacity>
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
    fontSize: fontBasic,
    color: '#000',
  },
});

export default GoogleLogin;
