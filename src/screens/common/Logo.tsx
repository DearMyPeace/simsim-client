// src/components/Logo.js

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const logoL = require('@assets/logo/left.png');
const logoC = require('@assets/logo/center.png');
const logoR = require('@assets/logo/right.png');

const Logo = () => {
  const leftValue = useRef(new Animated.Value(0)).current;
  const centerValue = useRef(new Animated.Value(0)).current;
  const rightValue = useRef(new Animated.Value(0)).current;

  const loadingAnimation = (value) => {
    return Animated.sequence([
      Animated.timing(value, {
        toValue: -10,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        loadingAnimation(leftValue),
        loadingAnimation(centerValue),
        loadingAnimation(rightValue),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.logoContainer}>
      <Animated.Image
        style={[styles.logoImageLeft, { transform: [{ translateY: leftValue }] }]}
        source={require('@assets/logo/left.png')}
        resizeMode="contain"
      />
      <Animated.Image
        style={[styles.logoImageCenter, { transform: [{ translateY: centerValue }] }]}
        source={require('@assets/logo/center.png')}
        resizeMode="contain"
      />
      <Animated.Image
        style={[styles.logoImageRight, { transform: [{ translateY: rightValue }] }]}
        source={require('@assets/logo/right.png')}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  logoImageLeft: {
    width: 80,
    height: 80,
    position: 'absolute',
    // marginTop: 20,
    // marginRight: 6,
  },
  logoImageCenter: {
    width: 80,
    height: 80,
    position: 'absolute',
    // marginTop: 10,
    // marginRight: -40,
  },
  logoImageRight: {
    width: 80,
    height: 80,
    position: 'absolute',
  },
});

export default Logo;
