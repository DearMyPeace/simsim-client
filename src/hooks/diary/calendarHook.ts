import React, { useState } from 'react';
import { format, isFuture, isPast, isSameDay } from 'date-fns';
import { DateData } from 'react-native-calendars';
import { IDate } from '@type/Diary';
import { useDiaryCounts } from '@api/diary/get';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { tense } from '@stores/tense';

const getToday = () => format(new Date(), 'yyyy-MM-dd');
const getYear = () => format(new Date(), 'yyyy');
const getMonth = () => format(new Date(), 'MM') as IDate['month'];

const useCalendarHook = () => {
  const [today] = useState(getToday);
  const [selectedMonth, setSelectedMonth] = useState<IDate>({ year: getYear(), month: getMonth() });
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const setDateStatus = useSetRecoilState(tense);
  const [snackbarText, setSnackbarText] = useRecoilState(snackMessage);
  const { data, isPending, isError } = useDiaryCounts(selectedMonth);

  const onDayPress = (day: DateData) => {
    if (isSameDay(day.dateString, new Date(today))) {
      setDateStatus('TODAY');
    } else if (isPast(day.dateString)) {
      const marked = data?.find((item) => item.markedDate === day.dateString);
      if (!marked) {
        setSnackbarText('오늘의 심심기록만 작성할 수 있습니다');
        setDateStatus(null);
        return;
      }
      setDateStatus('PAST');
    } else if (isFuture(new Date(day.dateString))) {
      setSnackbarText('오늘의 심심기록만 작성할 수 있습니다');
      setDateStatus(null);
      return;
    }
    setSelectedDate(day.dateString);
    setSnackbarText('');
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
