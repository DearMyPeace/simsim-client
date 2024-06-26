import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { saveToken, getToken, removeToken } from '@components/login/AuthService';
import MyText from '@components/common/MyText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fontBasic } from '@utils/Sizing';

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_CLIENT_ID,
});

const GoogleLogin = () => {
  const [userInfo, setUserInfo] = useState(null);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = userInfo.idToken;
      await saveToken(token);
      setUserInfo(userInfo);
      console.log(userInfo);
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

  const handleLogout = async () => {
    await removeToken();
    setUserInfo(null);
    await GoogleSignin.signOut();
  };

  const checkUser = async () => {
    const token = await getToken();
    if (token) {
      // Fetch user info using the token if necessary
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <View>
      {userInfo ? (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
          <View style={styles.iconAndText}>
            <Icon name="google" size={20} color="#000" style={styles.icon} />
            <MyText style={styles.loginButtonText}>Logout from Google</MyText>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={signInWithGoogle}>
          <View style={styles.iconAndText}>
            <Icon name="google" size={20} color="#000" style={styles.icon} />
            <MyText style={styles.loginButtonText}>Google로 계속하기</MyText>
          </View>
        </TouchableOpacity>
      )}
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
  },
  loginButtonText: {
    fontSize: fontBasic,
    color: '#000',
  },
});

export default GoogleLogin;
