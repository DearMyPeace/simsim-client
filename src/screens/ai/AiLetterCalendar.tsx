import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { IDate, IDay } from '@type/Diary';
import { CalendarProvider } from 'react-native-calendars';
import AiLetterCalendarHeader from '@screens/ai/AiLetterCalendarHeader';

const parseDateStr = (dateStr: string): IDay => {
  const [year, month, day] = dateStr.split('-');
  return {
    year,
    month: month.padStart(2, '0') as IDate['month'],
    day: day.padStart(2, '0'),
  };
};

const AiLetterCalendar = ({ children, targetDateStr, onMonthChange }) => {
  const [isToday, setIsToday] = useState(true);

  const initialDate = parseDateStr(targetDateStr);
  const [selectedDate, setSelectedDate] = useState<IDay>(initialDate);

  useEffect(() => {
    setSelectedDate(parseDateStr(targetDateStr));
    console.log('Initial render or targetDateStr changed');
  }, [targetDateStr]);

  useEffect(() => {
    const checkIfToday = () => {
      const todayYear = format(new Date(), 'yyyy');
      const todayMonth = format(new Date(), 'MM') as IDate['month'];
      setIsToday(selectedDate.year === todayYear && selectedDate.month === todayMonth);
    };

    checkIfToday();
  }, [selectedDate]);

  const handleMonthChange = useCallback(
    (date) => {
      const year = date.year.toString();
      const month = date.month.toString().padStart(2, '0') as IDate['month'];
      const day = format(new Date(), 'dd');
      setSelectedDate({ year, month, day });
      onMonthChange(`${year}-${month}`);
    },
    [onMonthChange],
  );

  const handleMonthYearSelect = (month: number, year: number) => {
    const formattedMonth = month.toString().padStart(2, '0') as IDate['month'];
    setSelectedDate((prevState) => ({
      ...prevState,
      month: formattedMonth,
      year: year.toString(),
    }));
    onMonthChange(`${year}-${formattedMonth}`);
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(Number(selectedDate.year), Number(selectedDate.month) - 1 + increment);
    const year = format(newDate, 'yyyy');
    const month = format(newDate, 'MM') as IDate['month'];
    const day = format(new Date(), 'dd');
    setSelectedDate({ year, month, day });
    onMonthChange(`${year}-${month}`);
  };

  const onLeftPress = () => {
    changeMonth(-1);
  };

  const onRightPress = () => {
    changeMonth(1);
  };

  const handleTodayPress = () => {
    const year = format(new Date(), 'yyyy');
    const month = format(new Date(), 'MM') as IDate['month'];
    const day = format(new Date(), 'dd');
    setSelectedDate({ year, month, day });
    onMonthChange(`${year}-${month}`);
  };

  return (
    <View style={styles.container}>
      <CalendarProvider
        date={`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`}
        onDateChanged={() => {}}
        onMonthChange={handleMonthChange}
      >
        <AiLetterCalendarHeader
          selectedDate={selectedDate}
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
          onMonthYearSelect={handleMonthYearSelect}
          onPressToday={handleTodayPress}
          isToday={isToday}
        />
        {children}
      </CalendarProvider>
    </View>
  );
};

export default AiLetterCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'transparent',
    userSelect: 'none',
  },
  todayButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
