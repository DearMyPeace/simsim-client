import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';

const DiaryCarousel = () => {
  return (
    <View style={styles.container}>
      {/* 시간 */}
      <View style={styles.header}>
        <MyText>오늘</MyText>
        <MyText>2021년 9월 21일</MyText>
      </View>
      {/* 다이어리 */}
      <View style={styles.content}>
        <MyText>
          Lorem ipsum dolor sit amet consectetur. Vel proin aliquam diam nulla. Ut sem ut eget ut
          vulputate mauris consectetur rhoncus. Id in imperdiet ultrices id ipsum pretium egestas ac
          purus sed suspendisse.
        </MyText>
      </View>
    </View>
  );
};

export default DiaryCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F1E2CC',
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    paddingTop: 6,
    textAlign: 'left',
  },
});
