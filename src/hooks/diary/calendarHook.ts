import React, { useEffect, useState } from 'react';
import { format, isFuture, isPast, isSameDay } from 'date-fns';
import { DateData } from 'react-native-calendars';
import { DateStatus } from '@type/Diary';

const getToday = () => format(new Date(), 'yyyy-MM-dd');

const useCalendarHook = () => {
  const [today] = useState(getToday);
  const [selectedDate, setSelectedDate] = useState(today);
  const [dateStatus, setDateStatus] = useState<DateStatus>('TODAY');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const onDayPress = (day: DateData) => {
    if (isSameDay(day.dateString, new Date(today))) {
      setDateStatus('TODAY');
    } else if (isPast(day.dateString)) {
      setDateStatus('PAST');
    } else if (isFuture(new Date(day.dateString))) {
      setSnackbarVisible(true);
      return;
    }
    setSelectedDate(day.dateString);
  };

  useEffect(() => {
    console.log('dateStatus!!', dateStatus);
  }, [dateStatus]);

  return {
    today,
    selectedDate,
    setSelectedDate,
    dateStatus,
    setDateStatus,
    onDayPress,
    snackbarVisible,
    setSnackbarVisible,
  };
};

export default useCalendarHook;
