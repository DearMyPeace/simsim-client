import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated as RNAnimated } from 'react-native';
import { format } from 'date-fns';
import { IDate, IDay } from '@type/Diary';
import { CalendarProvider } from 'react-native-calendars';
import AiLetterCalendarHeader from '@screens/ai/AiLetterCalendarHeader';
import TodayButton from '@components/common/TodayButton';

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
  const [, setIsDragging] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const DRAG_THRESHOLD = 10;

  const initialDate = parseDateStr(targetDateStr);
  const [selectedDate, setSelectedDate] = useState<IDay>(initialDate);

  const position = useRef(new RNAnimated.ValueXY({ x: 0, y: 0 })).current;
  const startPosition = useRef({ x: 0, y: 0 }).current;

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        startPosition.x = evt.nativeEvent.pageX;
        startPosition.y = evt.nativeEvent.pageY;
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });
        setIsDragging(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        position.flattenOffset();
        const distance = Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2));
        if (distance <= DRAG_THRESHOLD) {
          handleTodayPress();
        } else {
          setIsDragging(true);
        }
        timerRef.current = setTimeout(() => {
          setIsDragging(false);
        }, 100);
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
      },
    }),
  ).current;

  const animatedStyle = {
    transform: position.getTranslateTransform(),
    ...styles.todayButton,
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
        />
        {children}
        {!isToday && <TodayButton handler={panResponder.panHandlers} buttonStyle={animatedStyle} />}
      </CalendarProvider>
    </View>
  );
};

export default AiLetterCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'transparent',
    userSelect: 'none',
  },
  todayButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
