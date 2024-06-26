import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import Logo from '@screens/common/Logo';
import ScrollingText from '@screens/common/ScrollingTextScreen';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  const words = ['사랑', '친구', '가족', '동료', '이웃'];

  return (
    <View style={styles.container}>
      <ScrollingText words={words} />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Logo />
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Dear my peace</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Kalam-Bold',
    marginTop: 20,
  },
});

export default SplashScreen;
