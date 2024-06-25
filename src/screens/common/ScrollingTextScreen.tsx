import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Easing } from 'react-native';

const ScrollingText = ({ words }) => {
  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: words.length,
        duration: words.length * 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, [scrollAnim, words.length]);

  const translateY = scrollAnim.interpolate({
    inputRange: words.map((_, i) => i),
    outputRange: words.map((_, i) => -i * 20), // 텍스트 높이에 따라 조정
  });

  return (
    <View style={styles.scrollContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {words.map((word, index) => (
          <Text key={index} style={styles.scrollText}>
            {word}에게 조각편지 받는다.
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: 20, // 텍스트 높이와 일치하게 설정
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollText: {
    fontSize: 16,
    fontFamily: 'GowunBatang-Regular',
    textAlign: 'center',
  },
});

export default ScrollingText;
