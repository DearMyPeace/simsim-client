import React, { useState } from 'react';
import { format, isFuture, isPast, isSameDay } from 'date-fns';
import { DateData } from 'react-native-calendars';
import { DateStatus, IDate } from '@type/Diary';
import { useDiaryCounts } from '@api/diary/get';

const getToday = () => format(new Date(), 'yyyy-MM-dd');
const getYear = () => format(new Date(), 'yyyy');
const getMonth = () => format(new Date(), 'MM') as IDate['month'];

const useCalendarHook = () => {
  const [today] = useState(getToday);
  const [selectedMonth, setSelectedMonth] = useState<IDate>({ year: getYear(), month: getMonth() });
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [dateStatus, setDateStatus] = useState<DateStatus>('TODAY');
  const [snackbarText, setSnackbarText] = useState('');
  const { data, isPending, isError } = useDiaryCounts(selectedMonth);

  const onDayPress = (day: DateData) => {
    if (isSameDay(day.dateString, new Date(today))) {
      setDateStatus('TODAY');
      console.log('TODAY');
    } else if (isPast(day.dateString)) {
      const marked = data?.find((item) => item.markedDate === day.dateString);
      if (!marked) {
        setSnackbarText('작성된 심심 기록이 없습니다');
        return;
      }
      setDateStatus('PAST');
    } else if (isFuture(new Date(day.dateString))) {
      setSnackbarText('미래의 심심 기록은 작성할 수 없습니다');
      console.log('FUTURE');
      return;
    }
    console.log(`day.dateString: ${day.dateString}`);
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
    dateStatus,
    setDateStatus,
    onDayPress,
    onMonthChange,
    snackbarText,
    setSnackbarText,
    markedDates: data || [],
    isPending,
    isError,
  };
};

export default useCalendarHook;
