import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import MyText from '@components/common/MyText';
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 추가

const AppleLoginWeb = () => {
  const AppleSignIn = async () => {
    // Apple Sign-In 웹용 로직 추가 가능
    Alert.alert('애플 로그인은 iOS에서만 지원됩니다.');
  };

  return (
    <TouchableOpacity style={styles.loginButton} onPress={AppleSignIn}>
      <View style={styles.iconAndText}>
        <Icon name="apple" size={20} color="#000" style={styles.icon} />
        <MyText style={styles.loginButtonText}>Apple로 계속하기</MyText>
      </View>
    </TouchableOpacity>
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
    fontSize: 14,
    color: '#000',
  },
});

export default AppleLoginWeb;
