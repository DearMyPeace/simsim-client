import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import { IDay } from '@type/Diary';
import { fontLarge } from '@utils/Sizing';

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
      <Text style={styles.headerText}>{`${kMonth[selectedDate.month - 1]} ${
        selectedDate.year
      }년 `}</Text>
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={onLeftPress}>
          <CalendarArrow direction="left" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRightPress}>
          <CalendarArrow direction="right" />
        </TouchableOpacity>
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
    fontSize: fontLarge,
    fontFamily: 'GowunBatang-Regular',
    color: '#333333',
  },
  arrowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
