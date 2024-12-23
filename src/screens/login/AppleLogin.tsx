import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import sha256 from 'sha256';
import { fontBasic } from '@utils/Sizing';
import useSendUserToken from '@hooks/login/useSendUserToken';
import MyText from '@components/common/MyText';
import AppleIcon from '@components/common/AppleIcon';

const AppleLogin = ({ handleLoginPress }) => {
  const sendUserToken = useSendUserToken('apple');

  const AppleSignIn = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        nonce: sha256('unique_nonce_value'),
        state: 'state_value',
      });

      console.log('Apple Auth Response:', appleAuthRequestResponse);

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { identityToken, email, fullName, authorizationCode, state } =
          appleAuthRequestResponse;

        if (identityToken) {
          const payload = {
            authorization: {
              code: authorizationCode,
              id_token: identityToken,
              state: state,
            },
            user: {
              name: {
                firstName: fullName?.givenName || 'Unknown',
                lastName: fullName?.familyName || 'Unknown',
              },
              email: email || 'unknown@apple.com',
            },
          };

          console.log('Payload to be sent:', payload);

          sendUserToken.mutate(payload);
        } else {
          console.error('Failed to get identity token');
        }
      } else {
        console.error('Credential state is not authorized');
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
    }
  };

  return (
    <Pressable style={styles.loginButton} onPress={() => handleLoginPress(AppleSignIn)}>
      <View style={styles.iconAndText}>
        <AppleIcon style={styles.icon} />
        <MyText style={styles.loginButtonText}>Apple로 계속하기</MyText>
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
    marginRight: 10,
  },
  loginButtonText: {
    fontSize: fontBasic,
    color: '#000',
  },
});

export default AppleLogin;
