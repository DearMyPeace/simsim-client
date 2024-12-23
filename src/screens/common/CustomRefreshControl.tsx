// src/components/CustomRefreshControl.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// Import your SVG files as components
import LoadingL from '@assets/svg/loading/left.svg';
import LoadingC from '@assets/svg/loading/center.svg';
import LoadingR from '@assets/svg/loading/right.svg';

interface ICustomeRefreshControlProps {
  centered?: boolean;
}

const CustomRefreshControl = ({ centered }: ICustomeRefreshControlProps) => {
  const size = 20;
  const width = 100;
  const leftValue = useRef(new Animated.Value(0)).current;
  const centerValue = useRef(new Animated.Value(0)).current;
  const rightValue = useRef(new Animated.Value(0)).current;

  const loadingAnimation = (value: Animated.Value) => {
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
      Animated.parallel([
        loadingAnimation(leftValue),
        Animated.sequence([Animated.delay(150), loadingAnimation(centerValue)]),
        Animated.sequence([Animated.delay(300), loadingAnimation(rightValue)]),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={[styles.loadingContainer, centered && { height: '100%' }]}>
      <Animated.View style={[styles.loadingImage, { transform: [{ translateY: leftValue }] }]}>
        <LoadingL width={width} height={size} style={{ color: '#666', width: '30' }} />
      </Animated.View>
      <Animated.View style={[styles.loadingImage, { transform: [{ translateY: centerValue }] }]}>
        <LoadingC width={width} height={size} style={{ color: '#666', width: '30' }} />
      </Animated.View>
      <Animated.View style={[styles.loadingImage, { transform: [{ translateY: rightValue }] }]}>
        <LoadingR width={width} height={size} style={{ color: '#666', width: '30' }} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  loadingImage: {
    position: 'absolute',
    marginHorizontal: 5,
  },
});

export default CustomRefreshControl;
