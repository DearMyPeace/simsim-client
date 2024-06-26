import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authTokenState, userInfoState, isLoggedInState } from '@stores/login';
import { useGoogleLogin } from '@react-oauth/google';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyText from '@components/common/MyText';
import { saveToken, getToken, removeToken } from '@components/login/AuthService';
import { useMutation } from '@tanstack/react-query';
import { postUserToken } from '@api/login/post';
import googleLogo from '@assets/logo/google.png';

const GoogleLogin = ({ handleLoginPress }) => {
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const sendUserToken = useMutation({
    mutationFn: (data) => postUserToken(data),
    onSuccess: (data) => {
      // TODO: back end에서 받은 data를 이용해 로그인 처리
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response.data.message);
    },
  });

  const login = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async (tokenResponse) => {
      sendUserToken.mutate(tokenResponse);
      const userInfo = await getUserInfo(tokenResponse.access_token);
      console.log(userInfo);
      await saveToken(tokenResponse.access_token);
      setUserInfo(userInfo);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      console.log(token);
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userInfoResponse = await response.json();
      return userInfoResponse;
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    setAuthToken(null);
    await removeToken();
    setUserInfo(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkStoredToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setAuthToken(storedToken);
        const userInfo = await getUserInfo(storedToken);
        setUserInfo(userInfo);
        setIsLoggedIn(true);
      }
    };
    checkStoredToken();
  }, [setAuthToken, setUserInfo, setIsLoggedIn]);

  return (
    <View>
      <TouchableOpacity style={styles.loginButton} onPress={() => handleLoginPress(login)}>
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
    fontSize: 14,
    color: '#000',
  },
});

export default GoogleLogin;