import React, { useEffect, useState } from 'react';
import { format, isFuture, isPast, isSameDay } from 'date-fns';
import { DateData } from 'react-native-calendars';
import { DateStatus } from '@type/Diary';

const getToday = () => format(new Date(), 'yyyy-MM-dd');

const useCalendarHook = () => {
  const [today] = useState(getToday);
  const [selectedDate, setSelectedDate] = useState(today);
  const [dateStatus, setDateStatus] = useState<DateStatus>('TODAY');

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    if (isSameDay(day.dateString, new Date(today))) {
      setDateStatus('TODAY');
    } else if (isPast(day.dateString)) {
      setDateStatus('PAST');
    } else if (isFuture(new Date(day.dateString))) {
      setDateStatus('FUTURE');
    }
  };

  useEffect(() => {
    console.log('dateStatus!!', dateStatus);
  }, [dateStatus]);

  return {
    today,
    selectedDate,
    dateStatus,
    setDateStatus,
    onDayPress,
  };
};

export default useCalendarHook;
