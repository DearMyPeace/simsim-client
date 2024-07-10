import { StyleSheet, View } from 'react-native';
import React from 'react';
import MyText from '@components/common/MyText';
import { fontLarge } from '@utils/Sizing';
import { kMonth } from '@utils/localeConfig';

const Dailyreport = ({ date, summary }) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth();
  const day = formattedDate.getDate();

  const displayDate = `${year}년 ${kMonth[month]} ${day}일`;

  return (
    <View style={styles.container}>
      <MyText style={styles.title}>{displayDate}</MyText>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: fontLarge,
    fontFamily: 'GowunBatang-Bold',
  },
});
