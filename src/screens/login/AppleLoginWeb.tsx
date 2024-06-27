import React, { useRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import MyText from '@components/common/MyText';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppleSignin from 'react-apple-signin-auth';
import sha256 from 'sha256';
import { fontBasic } from '@utils/Sizing';

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
    mutationFn: (data) => postUserToken(data),
    onSuccess: (data) => {
      // TODO: back end에서 받은 data를 이용해 로그인 처리
      console.log(data);
    },
    onError: (error) => {
      console.error(error.response.data.message);
    },
  });

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
          // TODO: web 배포 후 다시 만져줘야함.
          clientId: 'site.peace.my.dear', // 동일한 clientId 사용
          redirectURI: 'http://dear-my-peace.site', // 동일한 redirectURI 사용
          scope: 'email name',
          state: 'state',
          nonce: sha256('nonce'), // nonce를 sha256으로 변환
          usePopup: true,
        }}
        onSuccess={(response) => {
          console.log(response);
          sendUserToken.mutate(response);
        }}
        onError={(error) => {
          console.error(error);
        }}
        render={(props) => {
          appleSignInRef.current = props.onClick; // 버튼 클릭 함수 참조 저장
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
