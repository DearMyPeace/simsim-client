// src/screens/ai/AiLetterCalendar.tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import { IDate, IDay } from '@type/Diary';
import { CalendarProvider } from 'react-native-calendars';
import { appColor3 } from '@utils/colors';
import AiLetterCalendarHeader from '@screens/ai/AiLetterCalendarHeader';

const getYear = () => format(new Date(), 'yyyy');
const getMonth = () => format(new Date(), 'MM') as IDate['month'];
const getDay = () => format(new Date(), 'dd');

const AiLetterCalendar = ({ children, onMonthChange }) => {
  const todayBtnTheme = useRef({
    todayButtonTextColor: appColor3,
  });
  const [selectedDate, setSelectedDate] = useState<IDay>({
    year: getYear(),
    month: getMonth(),
    day: getDay(),
  });

  useEffect(() => {
    setSelectedDate({ year: getYear(), month: getMonth(), day: getDay() });
  }, []);

  const handleMonthChange = useCallback(
    (date) => {
      console.log('ExpandableCalendarScreen onMonthChange: ', date);
      const year = date.year.toString();
      const month = date.month.toString().padStart(2, '0') as IDate['month'];
      const day = getDay();
      setSelectedDate({ year, month, day });
      onMonthChange({ year, month });
    },
    [onMonthChange],
  );

  const onLeftPress = () => {
    const newDate = new Date(Number(selectedDate.year), Number(selectedDate.month) - 2);
    const year = format(newDate, 'yyyy');
    const month = format(newDate, 'MM') as IDate['month'];
    const day = getDay();
    setSelectedDate({ year, month, day });
    onMonthChange({ year, month });
  };

  const onRightPress = () => {
    const newDate = new Date(Number(selectedDate.year), Number(selectedDate.month));
    const year = format(newDate, 'yyyy');
    const month = format(newDate, 'MM') as IDate['month'];
    const day = getDay();
    setSelectedDate({ year, month, day });
    onMonthChange({ year, month });
  };

  return (
    <CalendarProvider
      date={`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`}
      onDateChanged={() => {}}
      onMonthChange={handleMonthChange}
      showTodayButton
      theme={todayBtnTheme.current}
    >
      <AiLetterCalendarHeader
        selectedDate={selectedDate}
        onLeftPress={onLeftPress}
        onRightPress={onRightPress}
      />
      {children}
    </CalendarProvider>
  );
};

export default AiLetterCalendar;
