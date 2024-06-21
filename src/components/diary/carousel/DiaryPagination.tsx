import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import DiaryList from '@api/mock/DiaryList';

const DiaryPagination = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <View style={styles.container}>
      {DiaryList.map((diary, index) => {
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
});
