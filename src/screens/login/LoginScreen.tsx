import React, { useState, useEffect, useRef } from 'react';
import { Image, View, StyleSheet, Animated } from 'react-native';
import MyText from '@components/common/MyText';
import logo from '@assets/logo/logo.png';
import AppleLogin from '@screens/login/AppleLogin';
import GoogleLogin from '@screens/login/GoogleLogin';
import TermsModal from '@screens/login/TermsModal';
import CheckboxWrapper from '@screens/login/CheckBoxWrapper';
import { saveCheckStatus, getCheckStatus } from '@components/login/storageUtils';

const LoginScreen = () => {
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const loginFuncRef = useRef<(() => void) | null>(null);

  const handleCheckboxPress = () => {
    setIsModalVisible(true);
  };

  const handleAgree = async () => {
    if (!isPolicyChecked) {
      setIsPolicyChecked(true);
      await saveCheckStatus('policy', true);
    } else {
      setIsTermsChecked(true);
      await saveCheckStatus('terms', true);
      setIsModalVisible(false);
      if (loginFuncRef.current) {
        loginFuncRef.current();
        loginFuncRef.current = null;
      }
    }
  };

  const handleCancel = () => {
    setIsPolicyChecked(false);
    setIsTermsChecked(false);
    setIsModalVisible(false);
  };

  useEffect(() => {
    const loadCheckStatus = async () => {
      const policyStatus = await getCheckStatus('policy');
      const termsStatus = await getCheckStatus('terms');
      setIsPolicyChecked(policyStatus);
      setIsTermsChecked(termsStatus);
    };
    loadCheckStatus();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLoginPress = (loginFunc: () => void) => {
    if (!isPolicyChecked || !isTermsChecked) {
      loginFuncRef.current = loginFunc;
      setIsModalVisible(true);
    } else {
      loginFunc();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 120, height: 120 }} />
      <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
        <MyText style={styles.title} bold>
          심심조각
        </MyText>
        <View style={styles.loginOptions}>
          <GoogleLogin handleLoginPress={handleLoginPress} />
          <AppleLogin handleLoginPress={handleLoginPress} />
        </View>
        <CheckboxWrapper
          isPolicyChecked={isPolicyChecked}
          isTermsChecked={isTermsChecked}
          handleCheckboxPress={handleCheckboxPress}
        />
      </Animated.View>
      <TermsModal
        isModalVisible={isModalVisible}
        handleAgree={handleAgree}
        handleCancel={handleCancel}
        isPolicyChecked={isPolicyChecked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 16,
  },
  title: {
    fontSize: 25,
    marginBottom: 72,
    letterSpacing: 3,
    marginTop: 10,
  },
  loginOptions: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default LoginScreen;
