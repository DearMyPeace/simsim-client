import React, { useEffect, useRef, useState } from 'react';
import { View, Modal, StyleSheet, Animated, Image, Pressable } from 'react-native';
import SequentialText from '@screens/common/Sequential';
import { fontLarge, fontMedium } from '@utils/Sizing';
import Logo from '@screens/common/Logo';
import MyText from '@components/common/MyText';
import MyModal from '@components/common/MyModal';

// todo: 무료, 유료 유저 구분
const DiaryLoading = () => {
  const [isVisible, setIsVisible] = useState(true);
  const words = [
    `오늘의 기록은\n하루 3장까지 쓸 수 있어요`,
    `오늘의 기록만\n작성할 수 있어요`,
    `편지는 날짜마다\n하나씩 받을 수 있어요`,
  ];

  return (
    <MyModal
      visible={isVisible}
      setIsVisible={setIsVisible}
      transparent={true}
      containerStyle={styles.container}
    >
      <View style={styles.header}>
        <MyText size={fontLarge}>조각편지를 쓰고 있어요!</MyText>
      </View>
      <Logo />
      <View style={styles.textContainer}>
        <SequentialText words={words} stop={false} duration={3000} textStyles={styles.text} />
      </View>
    </MyModal>
  );
};

export default DiaryLoading;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 350,
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingBottom: 30,
  },
  logoContainer: {
    flex: 1,
    position: 'relative',
    // flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
  },
  textContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: fontMedium,
    fontFamily: 'GowunBatang-Regular',
    textAlign: 'center',
    color: 'black',
  },
});
