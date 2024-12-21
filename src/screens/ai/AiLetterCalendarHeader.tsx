import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import { ICalendarModalDate, IDay } from '@type/Diary';
import MyText from '@components/common/MyText';
import TodayButton from '@components/common/TodayButton';
import CalendarSelectModal from '@components/diary/calendar/CalendarSelectModal';
import { kMonth } from '@utils/localeConfig';
import useCalendarModal from '@hooks/common/useCalendarModal';

interface AiLetterCalendarHeaderProps {
  selectedDate: IDay;
  onLeftPress: () => void;
  onRightPress: () => void;
  onMonthYearSelect: (date: ICalendarModalDate) => void;
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
  const { isModalVisible, setModalVisible, selectedModalDate, setSelectedModalDate } =
    useCalendarModal({
      month: parseInt(selectedDate.month, 10),
      year: parseInt(selectedDate.year, 10),
    });

  useEffect(() => {
    const year = parseInt(selectedDate.year, 10);
    const month = parseInt(selectedDate.month, 10);
    setSelectedModalDate({ year, month });
  }, [selectedDate]);

  const handleModalDismiss = () => {
    onMonthYearSelect(selectedModalDate);
    setModalVisible(false);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.MYContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <MyText style={styles.headerText}>{`${kMonth[selectedModalDate.month - 1]} ${
            selectedModalDate.year
          }`}</MyText>
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
      <CalendarSelectModal
        isModalVisible={isModalVisible}
        handleModalDismiss={handleModalDismiss}
        selectedModalDate={selectedModalDate}
        setSelectedModalDate={setSelectedModalDate}
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
