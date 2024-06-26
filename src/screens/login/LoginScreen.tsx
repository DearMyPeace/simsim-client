import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform, Modal, TouchableOpacity, Animated } from 'react-native';
import MyText from '@components/common/MyText';
import CheckBox from '@react-native-community/checkbox';
import { CheckBox as WebCheckBox } from 'react-native-web';
import { ScrollView } from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';
import Logo from '@screens/common/Logo';
import terms from '@stores/terms';
import policy from '@stores/policy';
import { fontBasic, fontLarge, fontMedium } from '@utils/Sizing';

let AppleLogin;
let GoogleLogin;

if (Platform.OS === 'web') {
  AppleLogin = require('@screens/login/AppleLoginWeb').default;
  GoogleLogin = require('@screens/login/GoogleLoginWeb').default;
} else {
  AppleLogin = require('@screens/login/AppleLogin').default;
  GoogleLogin = require('@screens/login/GoogleLogin').default;
}

const LoginScreen = () => {
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const loginFuncRef = useRef(null);

  const handleCheckboxPress = () => {
    setIsModalVisible(true);
  };

  const handleAgree = () => {
    if (!isPolicyChecked) {
      setIsPolicyChecked(true);
    } else {
      setIsTermsChecked(true);
      setIsModalVisible(false);
      if (loginFuncRef.current) {
        loginFuncRef.current();
      }
    }
  };

  const handleCancel = () => {
    setIsPolicyChecked(false);
    setIsTermsChecked(false);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isModalVisible, fadeAnim, slideAnim]);

  const handleLoginPress = (loginFunc) => {
    if (!isPolicyChecked || !isTermsChecked) {
      loginFuncRef.current = loginFunc;
      setIsModalVisible(true);
    } else {
      loginFunc();
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <MyText style={styles.title}>Dear my peace</MyText>
      <View style={styles.separatorWrapper}>
        <View style={styles.separator} />
        <MyText style={styles.content}> 이메일로 로그인 | 가입 </MyText>
        <View style={styles.separator} />
      </View>
      <View style={styles.loginOptions}>
        <GoogleLogin handleLoginPress={handleLoginPress} />
        <AppleLogin handleLoginPress={handleLoginPress} />
      </View>
      <View style={styles.termsWrapper}>
        {Platform.OS === 'web' ? (
          <WebCheckBox
            value={isPolicyChecked && isTermsChecked}
            color="#444"
            onChange={handleCheckboxPress}
            style={styles.checkbox}
          />
        ) : (
          <CheckBox
            style={styles.checkbox}
            disabled={true}
            value={isPolicyChecked && isTermsChecked}
            onCheckColor="#FFFFFF"
            onFillColor="black"
            onTintColor="black"
            boxType="square"
          />
        )}
        <TouchableOpacity onPress={handleCheckboxPress} style={styles.termsWrapper}>
          <MyText style={styles.termsText}>이용약관</MyText>
          <MyText style={styles.termsTextNoLine}> 및 </MyText>
          <MyText style={styles.termsText}>개인정보처리방침</MyText>
          <MyText style={styles.termsTextNoLine}> 동의</MyText>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleCancel}
      >
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <View>
              <ScrollView style={styles.modalTerms}>
                <Markdown style={styles.markdown}>{isPolicyChecked ? terms : policy}</Markdown>
              </ScrollView>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
                <MyText style={styles.buttonText}>동의</MyText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <MyText style={styles.buttonText}>취소</MyText>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: fontLarge,
    fontFamily: 'Kalam-Bold',
    marginBottom: 72,
  },
  separatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
  },
  content: {
    fontSize: fontBasic,
    paddingHorizontal: 10,
  },
  loginOptions: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  termsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    fontFamily: 'GowunBatang-Regular',
    fontSize: fontBasic,
    color: '#000',
    textDecorationLine: 'underline',
    marginLeft: 3.5,
  },
  termsTextNoLine: {
    fontFamily: 'GowunBatang-Regular',
    fontSize: fontBasic,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTerms: {
    maxHeight: 300,
    marginBottom: 20,
  },
  modalText: {
    fontSize: fontMedium,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  agreeButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#444',
    borderRadius: 20,
  },
  cancelButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: fontMedium,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  markdown: {
    body: {
      fontSize: fontBasic,
      fontFamily: 'GowunBatang-Regular',
    },
    heading2: {
      fontSize: 24,
      fontFamily: 'GowunBatang-Bold',
      marginTop: 10,
    },
    heading3: {
      marginTop: 10,
    },
  },
});

export default LoginScreen;
