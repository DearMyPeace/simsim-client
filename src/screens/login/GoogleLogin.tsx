import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import MyText from '@components/common/MyText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fontBasic } from '@utils/Sizing';

GoogleSignin.configure({
  webClientId: 'key.apps.googleusercontent.com',
  iosClientId: 'key.apps.googleusercontent.com',
});

const GoogleLogin = () => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // userInfo.idToken을 백엔드로 전송하여 인증
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity style={styles.loginButton} onPress={signInWithGoogle}>
      <View style={styles.iconAndText}>
        <Icon name="google" size={20} color="#000" style={styles.icon} />
        <MyText style={styles.loginButtonText}>Google로 계속하기</MyText>
      </View>
    </TouchableOpacity>
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
  },
  loginButtonText: {
    fontSize: fontBasic,
    color: '#000',
  },
});

export default GoogleLogin;
