import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IDiary } from '@type/Diary';

interface IDiaryPaginationProps {
  activeIndex: number;
  diaryList: IDiary[];
}

const DiaryPagination = ({ activeIndex, diaryList }: IDiaryPaginationProps) => {
  return (
    <View style={styles.container}>
      {diaryList.length === 0 && <View style={[styles.dot, styles.empty]} />}
      {diaryList.map((diary, index) => {
        return <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />;
      })}
    </View>
  );
};

export default DiaryPagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#828282',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333333',
  },
  empty: {
    backgroundColor: 'transparent',
  },
});
