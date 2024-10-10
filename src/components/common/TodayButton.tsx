import React from 'react';
import { Animated as RNAnimated, StyleSheet } from 'react-native';
import MyText from '@components/common/MyText';
import { appColor3 } from '@utils/colors';

const TodayButton = ({ props, buttonStyle }: any) => {
  return (
    <RNAnimated.View {...props} style={[styles.todayButton, buttonStyle]}>
      <MyText style={styles.todayButtonText}>오늘</MyText>
    </RNAnimated.View>
  );
};

const styles = StyleSheet.create({
  todayButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: appColor3,
    borderWidth: 1,
  },
  todayButtonText: {
    color: appColor3,
    userSelect: 'none',
    fontFamily: 'GowunBatang-Bold',
  },
});

export default TodayButton;
