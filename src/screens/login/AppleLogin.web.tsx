import React, { useRef } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import MyText from '@components/common/MyText';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppleSignin from 'react-apple-signin-auth';
import sha256 from 'sha256';
import { fontBasic } from '@utils/Sizing';
import useSendUserToken from '@hooks/login/useSendUserToken';

const AppleLoginWeb = ({ handleLoginPress }) => {
  const sendUserToken = useSendUserToken('apple');
  const appleSignInRef = useRef(null);

  const AppleSignIn = async () => {
    if (appleSignInRef.current) {
      appleSignInRef.current();
    }
  };

  const _clientId: string = process.env.APPLE_CLIENT_ID ?? '';
  const _redirectURI: string = process.env.APPLE_REDIRECT_URI ?? '';

  return (
    <View>
      <Pressable style={styles.loginButton} onPress={() => handleLoginPress(AppleSignIn)}>
        <View style={styles.iconAndText}>
          <Icon name="apple" size={20} color="#000" style={styles.icon} />
          <MyText style={styles.loginButtonText}>Apple로 계속하기</MyText>
        </View>
      </Pressable>

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
            const token = {
              authorization: response.authorization,
              user: response.user,
            };
            sendUserToken.mutate(token);
          } catch (error) {
            console.error('Error during Apple login processing:', error);
          }
        }}
        onError={(error) => {
          console.error('Apple login error:', error);
        }}
        render={(props) => {
          appleSignInRef.current = props.onClick;
          return (
            <Pressable style={styles.hiddenLoginButton} onPress={props.onClick}>
              <View style={styles.iconAndText}>
                <Icon name="apple" size={20} color="#000" style={styles.icon} />
                <MyText style={styles.loginButtonText}>Apple로 계속</MyText>
              </View>
            </Pressable>
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
