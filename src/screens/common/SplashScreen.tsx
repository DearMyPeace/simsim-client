import React, { useEffect, useState, useRef } from 'react';
import { Image, View, StyleSheet, Animated } from 'react-native';
import MyText from '@components/common/MyText';
import logo from '@assets/logo/logo.png';
import SequentialText from '@screens/common/Sequential';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [stopText, setStopText] = useState(false);
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setStopText(true);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1500);

    const translateTimer = setTimeout(() => {
      Animated.timing(translateYAnim, {
        toValue: -122,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 1500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(translateTimer);
    };
  }, [translateYAnim, fadeAnim, onFinish]);

  const words = [
    '고양이',
    '감정형 (F)',
    '사고형 (T)',
    '옆집 친구',
    '강아지',
    '심리 상담사',
    '나를 지켜보는 친구',
    '작은 철학자',
    '마음 비서',
    '작은 조언자',
    '낯선 관찰자',
    '나만 아는 타인',
    '비밀친구',
    '감정집배원',
    '기억수집가',
    '조각관찰자',
    '마음주치의',
    '단짝 친구',
    '수다쟁이',
    '트레이너',
    '매니저',
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scrollingTextContainer, { opacity: fadeAnim }]}>
        <MyText style={styles.fixedText}>나는</MyText>
        <View style={{ flexDirection: 'row' }}>
          <SequentialText words={words} stop={stopText} />
          <MyText style={styles.fixedText}>에게</MyText>
        </View>
        <MyText style={styles.fixedText}>{'조각편지 받는다.'}</MyText>
      </Animated.View>
      <View style={styles.centerContainer}>
        <Animated.View style={{ transform: [{ translateY: translateYAnim }] }}>
          <Image source={logo} style={{ width: 120, height: 120 }} />
        </Animated.View>
      </View>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>심심조각</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollingTextContainer: {
    position: 'absolute',
    top: 40,
    left: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  fixedText: {
    fontSize: 30,
    alignContent: 'center',
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    bottom: 20,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'GowunBatang-Regular',
  },
});

export default SplashScreen;
