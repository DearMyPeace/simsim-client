import React, { useEffect, useState } from 'react';
import { DateData } from 'react-native-calendars';
import { IDate } from '@type/Diary';
import { useDiaryCounts } from '@api/diary/get';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { markedDateStatus, selectedDateStatus, tense } from '@stores/tense';
import { getToday, getYear, getMonth } from '@utils/dateUtils';
import { isPast, isSameDay } from 'date-fns';

const useCalendarHook = () => {
  const [targetMonth, setTargetMonth] = useState<IDate>({ year: getYear(), month: getMonth() });
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateStatus);
  const setDateStatus = useSetRecoilState(tense);
  const [snackbarText, setSnackbarText] = useRecoilState(snackMessage);
  const { data, isPending, isError } = useDiaryCounts(targetMonth);
  const setMarkedDateSet = useSetRecoilState(markedDateStatus);

  useEffect(() => {
    if (data) {
      setMarkedDateSet(new Set(data.map((item) => item.markedDate)));
    }
  }, [data, setMarkedDateSet]);

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const onMonthChange = (date: DateData) => {
    const year = date.year.toString();
    const month = date.month.toString().padStart(2, '0') as IDate['month'];
    setTargetMonth({ year, month });
  };

  const saveDateStatus = (date: string) => {
    if (isSameDay(date, new Date(getToday()))) {
      setDateStatus('TODAY');
    } else if (isPast(new Date(date))) {
      setDateStatus('PAST');
    } else {
      setDateStatus('FUTURE');
    }
  };

  return {
    selectedDate,
    setSelectedDate,
    onDayPress,
    onMonthChange,
    setDateStatus,
    saveDateStatus,
    setTargetMonth,
    snackbarText,
    setSnackbarText,
    markedDates: data || [],
    isPending,
    isError,
  };
};

export default useCalendarHook;
