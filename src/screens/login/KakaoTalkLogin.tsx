import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
import katalk from '@assets/images/katalk.png';
import { fontBasic } from '@utils/Sizing';

const KakaoTalkLogin = ({ handleLoginPress }) => {
  return (
    <View>
      <Pressable style={styles.loginButton}>
        <View style={styles.iconAndText}>
          <Image source={katalk} style={styles.icon} />
          <MyText style={styles.loginButtonText}>Kakao로 계속하기</MyText>
        </View>
      </Pressable>
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
    marginBottom: 14,
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

export default KakaoTalkLogin;
