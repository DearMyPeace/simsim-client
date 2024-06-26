import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import MyText from '@components/common/MyText';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppleSignin from 'react-apple-signin-auth';
import sha256 from 'sha256';
import { fontBasic } from '@utils/Sizing';

const AppleLoginWeb = ({ handleLoginPress }) => {
  const AppleSignIn = async () => {
    // Apple Sign-In 웹용 로직 추가 가능
    console.log('Apple Sign-In 웹용 로직 추가 가능');
    Alert.alert('애플 로그인은 iOS에서만 지원됩니다.');
  };

  return (
    <View>
      <TouchableOpacity style={styles.loginButton} onPress={() => handleLoginPress(AppleSignIn)}>
        <View style={styles.iconAndText}>
          <Icon name="apple" size={20} color="#000" style={styles.icon} />
          <MyText style={styles.loginButtonText}>Apple로 계속하기</MyText>
        </View>
      </TouchableOpacity>

      {/* Apple Signin component with auth options */}
      <AppleSignin
        authOptions={{
          clientId: 'com.example.client-identifier', // 동일한 clientId 사용
          redirectURI: 'https://example.com/auth/callback', // 동일한 redirectURI 사용
          scope: 'email name',
          state: 'state',
          nonce: sha256('nonce'), // nonce를 sha256으로 변환
          usePopup: true,
        }}
        onSuccess={(response) => {
          console.log(response);
          // 성공 시 처리할 로직 추가
        }}
        onError={(error) => {
          console.error(error);
          // 실패 시 처리할 로직 추가
        }}
        render={(props) => (
          <TouchableOpacity style={styles.hiddenLoginButton} onPress={props.onClick}>
            <View style={styles.iconAndText}>
              <Icon name="apple" size={20} color="#000" style={styles.icon} />
              <MyText style={styles.loginButtonText}>Apple로 계속하기</MyText>
            </View>
          </TouchableOpacity>
        )}
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
    // display: 'none',
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
