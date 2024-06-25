import React, { useState } from 'react';
import { View, StyleSheet, Image, Platform, Modal, Text, TouchableOpacity } from 'react-native';
import GoogleLogin from '@screens/login/GoogleLogin';
import MyText from '@components/common/MyText';
import CheckBox from '@react-native-community/checkbox';
import { CheckBox as WebCheckBox } from 'react-native-web';
import { fontBasic, fontLarge, fontMedium } from '@utils/Sizing';

import logoL from '@assets/logo/left.png';
import logoC from '@assets/logo/center.png';
import logoR from '@assets/logo/right.png';

let AppleLogin;
if (Platform.OS === 'ios') {
  AppleLogin = require('@screens/login/AppleLogin').default;
} else {
  AppleLogin = require('@screens/login/AppleLoginWeb').default;
}

const LoginScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCheckboxPress = () => {
    setIsModalVisible(true);
  };

  const handleAgree = () => {
    setIsChecked(true);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsChecked(false);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoL} style={styles.logoImageLeft} />
        <Image source={logoC} style={styles.logoImageCenter} />
        <Image source={logoR} style={styles.logoImageRight} />
      </View>
      <MyText style={styles.title}>Dear my peace</MyText>
      <View style={styles.separatorWrapper}>
        <View style={styles.separator} />
        <MyText style={styles.content}> 이메일로 로그인 | 가입 </MyText>
        <View style={styles.separator} />
      </View>
      <View style={styles.loginOptions}>
        <GoogleLogin />
        <AppleLogin />
      </View>
      <View style={styles.termsWrapper}>
        {Platform.OS === 'web' ? (
          <WebCheckBox value={isChecked} onChange={handleCheckboxPress} style={styles.checkbox} />
        ) : (
          <CheckBox
            style={styles.checkbox}
            disabled={true}
            value={isChecked}
            onCheckColor="#FFFFFF"
            onFillColor="black"
            onTintColor="black"
            boxType="square"
            onValueChange={handleCheckboxPress}
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
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              이용약관 및 개인정보처리방침 내용을 여기에 작성합니다.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={handleAgree}>
                <Text style={styles.buttonText}>동의</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCancel}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  logoContainer: {
    flexDirection: 'row',
  },
  logoImageLeft: {
    width: 26,
    height: 83,
    marginTop: 20,
    marginRight: 8,
  },
  logoImageCenter: {
    width: 42,
    height: 63,
    marginRight: -45,
  },
  logoImageRight: {
    width: 73,
    height: 107,
  },
  title: {
    fontSize: fontLarge,
    // fontFamily: 'Kalam',
    fontFamily: 'GowunBatang-Bold',
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
  modalText: {
    fontSize: fontMedium,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
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
});

export default LoginScreen;
