import React, { useRef } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { fontBasic } from '@utils/Sizing';
import useSendUserToken from '@hooks/login/useSendUserToken';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyText from '@components/common/MyText';

const AppleLogin = ({ handleLoginPress }) => {
  const sendUserToken = useSendUserToken('apple');

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
          sendUserToken.mutate(token);
        } else {
          console.error('Failed to get identity token');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable style={styles.loginButton} onPress={() => handleLoginPress(AppleSignIn)}>
      <View style={styles.iconAndText}>
        <Icon name="apple" size={20} color="#000" style={styles.icon} />
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
    width: 20,
    height: 20,
  },
  loginButtonText: {
    fontSize: fontBasic,
    color: '#000',
  },
});

export default AppleLogin;
