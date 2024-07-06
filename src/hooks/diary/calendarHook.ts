import React, { useEffect, useState } from 'react';
import { DateData } from 'react-native-calendars';
import { IDate } from '@type/Diary';
import { useDiaryCounts } from '@api/diary/get';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { markedDateStatus, selectedDateStatus, tense } from '@stores/tense';
import { getYear, getMonth } from '@utils/dateUtils';

const useCalendarHook = () => {
  const [selectedMonth, setSelectedMonth] = useState<IDate>({ year: getYear(), month: getMonth() });
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateStatus);
  const setDateStatus = useSetRecoilState(tense);
  const [snackbarText, setSnackbarText] = useRecoilState(snackMessage);
  const { data, isPending, isError } = useDiaryCounts(selectedMonth);
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
    setSelectedMonth({ year, month });
  };

  return {
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
