import React, { useEffect, useState } from 'react';
import CalendarArrow, { Direction } from '@components/diary/calendar/CalendarArrow';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import setLocaleConfig, { kMonth } from '@utils/localeConfig';
import { IDate, IMarkedDates } from '@type/Diary';
import { dotColors } from '@utils/colors';
import { fontLarge } from '@utils/Sizing';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import CalendarSelectModal from './CalendarSelectModal';
import useCalendarHook from '@hooks/diary/calendarHook';

setLocaleConfig();

const MyCalendar = () => {
  const {
    onDayPress,
    onMonthChange,
    markedDates,
    selectedDate,
    setSelectedDate,
    saveDateStatus,
    setTargetMonth,
  } = useCalendarHook();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(parseInt(selectedDate.slice(5, 7), 10));
  const [selectedYear, setSelectedYear] = useState(parseInt(selectedDate.slice(0, 4), 10));
  const markedDatesList: IMarkedDates = markedDates.reduce((acc, date) => {
    acc[date.markedDate] = {
      selected: date.markedDate === selectedDate,
      marked: date.markedDate !== selectedDate,
      dotColor: dotColors[date.diaryCount] || dotColors[3],
    };
    return acc;
  }, {} as IMarkedDates);

  useEffect(() => {
    const year = new Date(selectedDate).getFullYear();
    const month = new Date(selectedDate).getMonth() + 1;
    setSelectedMonth(month);
    setSelectedYear(year);
    setTargetMonth({
      year: year.toString() as IDate['year'],
      month: month.toString().padStart(2, '0') as IDate['month'],
    });
    saveDateStatus(selectedDate);
  }, [selectedDate]);

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
    <View style={styles.container}>
      <Calendar
        key={selectedDate}
        current={selectedDate}
        style={styles.calendar}
        theme={{
          textDayFontFamily: 'GowunBatang-Regular',
          textMonthFontFamily: 'GowunBatang-Regular',
          textDayHeaderFontFamily: 'GowunBatang-Regular',
          textDayFontSize: 15,
          textDayHeaderFontSize: 15,
          textMonthFontSize: fontLarge,
          dayTextColor: '#666666',
          textDisabledColor: '#666666',
          arrowColor: '#666666',
          monthTextColor: '#333333',
          selectedDayBackgroundColor: '#C48E24',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#C48E24',
          'stylesheet.calendar.header': {
            headerContainer: { position: 'absolute', flexDirection: 'row', left: 10, gap: 20 },
            header: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            dayHeader: {
              color: '#333333',
              fontFamily: 'GowunBatang-Regular',
            },
          },
        }}
        webAriaLevel={1}
        hideExtraDays
        firstDay={1}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
        markedDates={{
          [selectedDate]: { selected: true },
          ...markedDatesList,
        }}
        renderArrow={(direction: Direction) => <CalendarArrow direction={direction} />}
        renderHeader={(date: string) => (
          <>
            <TextButton onPress={onHeaderPress}>
              <MyText size={fontLarge}>{getDisplayDate(new Date(date))}</MyText>
            </TextButton>
            <CalendarSelectModal
              isModalVisible={isModalVisible}
              handleModalDismiss={handleModalDismiss}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
            />
          </>
        )}
      />
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 12,
    padding: 10,
  },
});
