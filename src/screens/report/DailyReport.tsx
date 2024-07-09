import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyText from '@components/common/MyText';
import { fontLarge } from '@utils/Sizing';

const Dailyreport = (date, summary) => {
  return (
    <View style={styles.container}>
      <MyText style={styles.title}>{date}</MyText>
      <MyText>{summary}</MyText>
    </View>
  );
};

export default Dailyreport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    maxWidth: 645,
  },
  title: {
    fontSize: fontLarge,
    fontFamily: 'GowunBatang-Bold',
  },
});
