import React, { useRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import MyText from '@components/common/MyText';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppleSignin from 'react-apple-signin-auth';
import sha256 from 'sha256';
import { fontBasic } from '@utils/Sizing';
import { postUserAppleToken } from '@api/login/post';
import { saveToken } from '@components/login/AuthService';

const AppleLoginWeb = ({ handleLoginPress }) => {
  const appleSignInRef = useRef(null);

  const AppleSignIn = async () => {
    console.log('Apple Sign-In 웹용 로직 추가 가능');
    Alert.alert('애플 로그인은 iOS에서만 지원됩니다.');
    if (appleSignInRef.current) {
      appleSignInRef.current();
    }
  };

  const sendUserToken = useMutation({
    mutationFn: (data) => postUserAppleToken(data),
    onSuccess: async (data) => {
      try {
        // 서버로부터 받은 응답 데이터를 활용해 로그인 처리
        console.log(data);
        await saveToken(data.access_token); // 응답에서 access_token을 추출하여 로컬 스토리지에 저장
        // 추가로 필요한 로그인 후 로직을 여기에 작성합니다.
      } catch (error) {
        console.error('Error saving token:', error);
      }
    },
    onError: (error) => {
      console.error('Error during token exchange:', error);
      Alert.alert('로그인 오류', '애플 로그인 중 오류가 발생했습니다.');
    },
  });

  const _clientId: string = process.env.APPLE_CLIENT_ID ?? '';
  const _redirectURI: string = process.env.APPLE_REDIRECT_URI ?? '';

  return (
    <View>
      <TouchableOpacity style={styles.loginButton} onPress={() => handleLoginPress(AppleSignIn)}>
        <View style={styles.iconAndText}>
          <Icon name="apple" size={20} color="#000" style={styles.icon} />
          <MyText style={styles.loginButtonText}>Apple로 계속하기</MyText>
        </View>
      </TouchableOpacity>

      <AppleSignin
        authOptions={{
          clientId: _clientId,
          redirectURI: _redirectURI,
          scope: 'email name',
          state: 'state',
          nonce: sha256('nonce'),
          usePopup: true,
        }}
        onSuccess={async (response) => {
          console.log('Apple login response:', response);
          try {
            // 서버에 전송할 데이터 생성
            const data = {
              authorization: response.authorization,
              user: response.user,
            };
            sendUserToken.mutate(data);
          } catch (error) {
            console.error('Error during Apple login processing:', error);
            Alert.alert('로그인 오류', '로그인 처리 중 오류가 발생했습니다.');
          }
        }}
        onError={(error) => {
          console.error('Apple login error:', error);
          Alert.alert('로그인 오류', '애플 로그인 중 오류가 발생했습니다.');
        }}
        render={(props) => {
          appleSignInRef.current = props.onClick;
          return (
            <TouchableOpacity style={styles.hiddenLoginButton} onPress={props.onClick}>
              <View style={styles.iconAndText}>
                <Icon name="apple" size={20} color="#000" style={styles.icon} />
                <MyText style={styles.loginButtonText}>Apple로 계속</MyText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  hiddenLoginButton: {
    display: 'none',
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

export default AppleLoginWeb;
