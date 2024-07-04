import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import { IDay } from '@type/Diary';
import { fontLarge } from '@utils/Sizing';
import MyText from '@components/common/MyText';

interface AiLetterCalendarHeaderProps {
  selectedDate: IDay;
  onLeftPress: () => void;
  onRightPress: () => void;
}

const AiLetterCalendarHeader = ({
  selectedDate,
  onLeftPress,
  onRightPress,
}: AiLetterCalendarHeaderProps) => {
  const kMonth = [
    '일 월',
    '이 월',
    '삼 월',
    '사 월',
    '오 월',
    '유 월',
    '칠 월',
    '팔 월',
    '구 월',
    '시 월',
    '십일 월',
    '십이 월',
  ];

  return (
    <View style={styles.headerContainer}>
      <MyText style={styles.headerText}>{`${kMonth[selectedDate.month - 1]} ${
        selectedDate.year
      }`}</MyText>
      <View style={styles.arrowContainer}>
        <Pressable onPress={onLeftPress}>
          <CalendarArrow direction="left" />
        </Pressable>
        <Pressable onPress={onRightPress}>
          <CalendarArrow direction="right" />
        </Pressable>
      </View>
    </View>
  );
};

export default AiLetterCalendarHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 26,
    color: '#333333',
  },
  arrowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
