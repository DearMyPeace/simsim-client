import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text, Easing } from 'react-native';

const FadeInFadeOut = ({ words, duration = 300 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const startAnimation = () => {
    fadeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      startAnimation();
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.fadeContainer}>
      <Animated.Text style={{ ...styles.fadeText, opacity: fadeAnim }}>
        {words[currentIndex]}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fadeContainer: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeText: {
    fontSize: 35,
    fontFamily: 'GowunBatang-Bold',
    textAlign: 'center',
  },
});

export default FadeInFadeOut;
