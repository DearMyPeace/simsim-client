import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import { IDay } from '@type/Diary';
import MyText from '@components/common/MyText';
import TodayButton from '@components/common/TodayButton';
import CalendarSelectModal from '@components/diary/calendar/CalendarSelectModal';
import { kMonth } from '@utils/localeConfig';

interface AiLetterCalendarHeaderProps {
  selectedDate: IDay;
  onLeftPress: () => void;
  onRightPress: () => void;
  onMonthYearSelect: (month: number, year: number) => void;
  onPressToday: () => void;
  isToday: boolean;
}

const AiLetterCalendarHeader = ({
  selectedDate,
  onLeftPress,
  onRightPress,
  onMonthYearSelect,
  isToday,
  onPressToday,
}: AiLetterCalendarHeaderProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(parseInt(selectedDate.month, 10));
  const [selectedYear, setSelectedYear] = useState(parseInt(selectedDate.year, 10));

  useEffect(() => {
    setSelectedMonth(parseInt(selectedDate.month, 10));
    setSelectedYear(parseInt(selectedDate.year, 10));
  }, [selectedDate]);

  const handleModalDismiss = () => {
    onMonthYearSelect(selectedMonth, selectedYear);
    setModalVisible(false);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.MYContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <MyText style={styles.headerText}>{`${
            kMonth[selectedMonth - 1]
          } ${selectedYear}`}</MyText>
        </Pressable>
        {!isToday && <TodayButton onPress={onPressToday} />}
      </View>
      <View style={styles.arrowContainer}>
        <Pressable onPress={onLeftPress}>
          <CalendarArrow direction="left" />
        </Pressable>
        <Pressable onPress={onRightPress}>
          <CalendarArrow direction="right" />
        </Pressable>
      </View>
      {/* Month and Year Modal */}
      <CalendarSelectModal
        isModalVisible={isModalVisible}
        handleModalDismiss={handleModalDismiss}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
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
  MYContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#333333',
  },
  arrowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
