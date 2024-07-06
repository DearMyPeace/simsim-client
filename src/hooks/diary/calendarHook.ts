import React, { useState } from 'react';
import { isSameDay } from 'date-fns';
import { DateData } from 'react-native-calendars';
import { IDate } from '@type/Diary';
import { useDiaryCounts } from '@api/diary/get';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { selectedDateStatus, tense } from '@stores/tense';
import { getToday, getYear, getMonth } from '@utils/dateUtils';

const useCalendarHook = () => {
  const [today] = useState(getToday);
  const [selectedMonth, setSelectedMonth] = useState<IDate>({ year: getYear(), month: getMonth() });
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateStatus);
  const setDateStatus = useSetRecoilState(tense);
  const [snackbarText, setSnackbarText] = useRecoilState(snackMessage);
  const { data, isPending, isError } = useDiaryCounts(selectedMonth);

  const onDayPress = (day: DateData) => {
    isSameDay(day.dateString, new Date(today)) ? setDateStatus('TODAY') : setDateStatus('PAST');
    setSelectedDate(day.dateString);
  };

  const onMonthChange = (date: DateData) => {
    const year = date.year.toString();
    const month = date.month.toString().padStart(2, '0') as IDate['month'];
    setSelectedMonth({ year, month });
  };

  return {
    today,
    selectedDate,
    setSelectedDate,
    onDayPress,
    onMonthChange,
    setDateStatus,
    snackbarText,
    setSnackbarText,
    markedDates: data || [],
    isPending,
    isError,
  };
};

export default useCalendarHook;
