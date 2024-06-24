// AppleLogin.tsx
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';

const AppleLogin = () => {
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
        console.log('Apple Login Test');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity style={styles.loginButton}>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appleButton}
        onPress={AppleSignIn}
      />
    </TouchableOpacity>
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
