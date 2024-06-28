import { appColor4 } from '@utils/colors';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SequentialText = ({ words, stop, duration = 300 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (stop) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{words[currentIndex]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
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