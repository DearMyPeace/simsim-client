import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SequentialText from '@screens/common/Sequential';
import { fontLarge, fontMedium } from '@utils/Sizing';
import Logo from '@screens/common/Logo';
import MyText from '@components/common/MyText';
import MyModal from '@components/common/MyModal';
import { manual } from '@utils/manual';

// todo: 무료, 유료 유저 구분
const DiaryLoading = () => {
  const [isVisible, setIsVisible] = useState(true);

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
        <SequentialText words={manual} stop={false} duration={3000} textStyles={styles.text} />
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
