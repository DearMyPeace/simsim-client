import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import useSendUserToken from '@hooks/login/useSendUserToken';

const AppleLogin = ({ handleLoginPress }) => {
  const sendUserToken = useSendUserToken();
  const appleSignInRef = useRef(null);

  const AppleSignIn = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { identityToken, email, fullName } = appleAuthRequestResponse;

        if (identityToken) {
          const token = {
            authorization: identityToken,
            user: JSON.stringify({ email, fullName }),
          };
          sendUserToken.mutate({ token, type: 'apple' });
        } else {
          console.error('Failed to get identity token');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={styles.appleButton}
      onPress={() => handleLoginPress(AppleSignIn)}
    />
  );
};

const styles = StyleSheet.create({
  loginButton: {
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  appleButton: {
    width: 160,
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
  },
});

export default AppleLogin;
