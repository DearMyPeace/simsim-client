import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { fontLarge } from '@utils/Sizing';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import MyText from '@components/common/MyText';
import CalendarSelectModal from '@components/diary/calendar/CalendarSelectModal';
import { kMonth } from '@utils/localeConfig';
import useCalendarModal from '@hooks/common/useCalendarModal';
import { ICalendarModalDate } from '@type/Diary';

interface IReportHeaderProps {
  selectedDate: ICalendarModalDate;
  setSelectedDate: Dispatch<SetStateAction<ICalendarModalDate>>;
}

function ReportHeader({ selectedDate, setSelectedDate }: IReportHeaderProps) {
  const { isModalVisible, setModalVisible, selectedModalDate, setSelectedModalDate } =
    useCalendarModal({
      month: selectedDate.month,
      year: selectedDate.year,
    });

  useEffect(() => {
    setSelectedModalDate(selectedDate);
  }, [selectedDate]);

  const handleModalDismiss = () => {
    setSelectedDate(selectedModalDate);
    setModalVisible(false);
  };

  const onHeaderPress = () => {
    setModalVisible(true);
  };

  const onLeftPress = () => {
    const { month, year } = selectedDate;
    month === 1
      ? setSelectedDate({ month: 12, year: year - 1 })
      : setSelectedDate({ month: month - 1, year });
  };

  const onRightPress = () => {
    const { month, year } = selectedDate;
    month === 12
      ? setSelectedDate({ month: 1, year: year + 1 })
      : setSelectedDate({ month: month + 1, year });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onLeftPress}>
        <CalendarArrow direction="left" size={30} style={null} />
      </Pressable>
      <Pressable onPress={onHeaderPress}>
        <MyText size={fontLarge} bold>
          {kMonth[selectedDate.month - 1]}의 기억 조각
        </MyText>
      </Pressable>
      <CalendarSelectModal
        isModalVisible={isModalVisible}
        handleModalDismiss={handleModalDismiss}
        selectedModalDate={selectedModalDate}
        setSelectedModalDate={setSelectedModalDate}
      />
      <Pressable onPress={onRightPress}>
        <CalendarArrow direction="right" size={30} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '80%',
  },
});

export default ReportHeader;
