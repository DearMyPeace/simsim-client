import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import CalendarSelectModal from './CalendarSelectModal';
import { kMonth } from '@utils/localeConfig';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedDateStatus, tense } from '@stores/tense';
import { fontLarge } from '@utils/Sizing';
import TodayButton from '@components/common/TodayButton';
import { getToday } from '@utils/dateUtils';
import useCalendarModal from '@hooks/common/useCalendarModal';

const CalendarHeader = ({ date }: { date: string }) => {
  const dateState = useRecoilValue(tense);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateStatus);
  const { isModalVisible, setModalVisible, selectedModalDate, setSelectedModalDate } =
    useCalendarModal({
      month: parseInt(selectedDate.slice(5, 7), 10),
      year: parseInt(selectedDate.slice(0, 4), 10),
    });

  const handleModalDismiss = () => {
    const day = selectedDate.slice(8, 10);
    const { year: selectedYear, month: selectedMonth } = selectedModalDate;
    const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
    const month = selectedMonth.toString().padStart(2, '0');
    if (parseInt(day, 10) > lastDay) {
      setSelectedDate(`${selectedYear}-${month}-${lastDay}`);
    } else {
      setSelectedDate(`${selectedYear}-${month}-${day}`);
    }
    setModalVisible(false);
  };

  const onHeaderPress = () => {
    setModalVisible(true);
  };

  const getDisplayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return `${kMonth[month]} ${year}`;
  };

  const onPressToday = () => {
    setSelectedDate(getToday());
  };

  return (
    <View style={styles.header}>
      <TextButton onPress={onHeaderPress} labelStyle={styles.headerButton}>
        <MyText style={styles.headerText}>{getDisplayDate(new Date(date))}</MyText>
      </TextButton>
      {dateState !== 'TODAY' && (
        <TodayButton containerStyle={styles.todayButton} onPress={onPressToday} />
      )}
      <CalendarSelectModal
        isModalVisible={isModalVisible}
        handleModalDismiss={handleModalDismiss}
        selectedModalDate={selectedModalDate}
        setSelectedModalDate={setSelectedModalDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerButton: {
    ...Platform.select({
      android: {
        paddingVertical: 5,
      },
    }),
  },
  headerText: {
    color: '#333333',
    fontSize: fontLarge,
  },
  todayButton: {
    ...Platform.select({
      android: {
        marginBottom: 10,
      },
    }),
  },
});

export default CalendarHeader;
