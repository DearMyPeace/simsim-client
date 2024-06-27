import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text, Easing } from 'react-native';

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ScrollingText = ({ words }) => {
  const [shuffledWords, setShuffledWords] = useState(shuffleArray(words));
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    scrollAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: shuffledWords.length,
          duration: shuffledWords.length * 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(scrollAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start(() => {
      setShuffledWords(shuffleArray(words));
      startAnimation();
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const translateY = scrollAnim.interpolate({
    inputRange: shuffledWords.map((_, i) => i),
    outputRange: shuffledWords.map((_, i) => -i * 35),
  });

  return (
    <View style={styles.scrollContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {shuffledWords.map((word, index) => (
          <Text key={index} style={styles.scrollText}>
            {word}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollText: {
    fontSize: 35,
    fontFamily: 'GowunBatang-Bold',
    textAlign: 'center',
  },
});

export default ScrollingText;
