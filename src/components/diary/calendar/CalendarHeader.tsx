import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import CalendarSelectModal from './CalendarSelectModal';
import { kMonth } from '@utils/localeConfig';
import { useRecoilState } from 'recoil';
import { selectedDateStatus } from '@stores/tense';
import { fontLarge } from '@utils/Sizing';
import TodayButton from '@components/common/TodayButton';

const CalendarHeader = ({ date }: { date: string }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateStatus);
  const [selectedMonth, setSelectedMonth] = useState(parseInt(selectedDate.slice(5, 7), 10));
  const [selectedYear, setSelectedYear] = useState(parseInt(selectedDate.slice(0, 4), 10));

  const handleModalDismiss = () => {
    const day = selectedDate.slice(8, 10);
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

  return (
    <View style={styles.header}>
      <TextButton onPress={onHeaderPress}>
        <MyText style={styles.headerText}>{getDisplayDate(new Date(date))}</MyText>
      </TextButton>
      <TodayButton />
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    color: '#333333',
    fontSize: fontLarge,
  },
  headerButton: {
    fontSize: 20,
  },
});

export default CalendarHeader;
