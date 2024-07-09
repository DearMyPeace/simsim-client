import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyText from '@components/common/MyText';
import { fontLarge } from '@utils/Sizing';

const Dailyreport = () => {
  return (
    <View style={styles.container}>
      <MyText style={styles.title}>2024년 6월 9일</MyText>
      <MyText>오후 06:14</MyText>
      <MyText>퇴근 하는 길에 딸기 세일하길래 두팩 구매했다. 내일은 딸기 파티닷 </MyText>
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
