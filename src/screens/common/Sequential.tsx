import { appColor4 } from '@utils/colors';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const SequentialText = ({ words, stop, duration = 300 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState(shuffleArray(words));

  useEffect(() => {
    if (stop) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledWords.length);
    }, duration);

    return () => clearInterval(interval);
  }, [shuffledWords, duration, stop]);

  useEffect(() => {
    setShuffledWords(shuffleArray(words));
  }, [words]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{shuffledWords[currentIndex]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 210,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 35,
    fontFamily: 'GowunBatang-Bold',
    textAlign: 'center',
    color: appColor4,
  },
});

export default SequentialText;
