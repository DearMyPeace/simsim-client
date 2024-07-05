import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated as RNAnimated } from 'react-native';
import { format } from 'date-fns';
import { IDate, IDay } from '@type/Diary';
import { CalendarProvider } from 'react-native-calendars';
import { appColor3 } from '@utils/colors';
import AiLetterCalendarHeader from '@screens/ai/AiLetterCalendarHeader';
import MyText from '@components/common/MyText';

const getYear = () => format(new Date(), 'yyyy');
const getMonth = () => format(new Date(), 'MM') as IDate['month'];
const getDay = () => format(new Date(), 'dd');

const AiLetterCalendar = ({ children, onMonthChange }) => {
  const [isToday, setIsToday] = useState(true);
  const [, setIsDragging] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const DRAG_THRESHOLD = 10;

  const [selectedDate, setSelectedDate] = useState<IDay>({
    year: getYear(),
    month: getMonth(),
    day: getDay(),
  });

  const position = useRef(new RNAnimated.ValueXY({ x: 0, y: 0 })).current;
  const startPosition = useRef({ x: 0, y: 0 }).current;

  useEffect(() => {
    setSelectedDate({ year: getYear(), month: getMonth(), day: getDay() });
  }, []);

  useEffect(() => {
    const checkIfToday = () => {
      const todayYear = getYear();
      const todayMonth = getMonth();
      const todayDay = getDay();
      setIsToday(
        selectedDate.year === todayYear &&
          selectedDate.month === todayMonth &&
          selectedDate.day === todayDay,
      );
    };

    checkIfToday();
  }, [selectedDate]);

  const handleMonthChange = useCallback(
    (date) => {
      const year = date.year.toString();
      const month = date.month.toString().padStart(2, '0') as IDate['month'];
      const day = getDay();
      setSelectedDate({ year, month, day });
      onMonthChange(`${year}-${month}`);
    },
    [onMonthChange],
  );

  const onLeftPress = () => {
    const newDate = new Date(Number(selectedDate.year), Number(selectedDate.month) - 2);
    const year = format(newDate, 'yyyy');
    const month = format(newDate, 'MM') as IDate['month'];
    const day = getDay();
    setSelectedDate({ year, month, day });
    onMonthChange(`${year}-${month}`);
  };

  const onRightPress = () => {
    const newDate = new Date(Number(selectedDate.year), Number(selectedDate.month));
    const year = format(newDate, 'yyyy');
    const month = format(newDate, 'MM') as IDate['month'];
    const day = getDay();
    setSelectedDate({ year, month, day });
    onMonthChange(`${year}-${month}`);
  };

  const handleTodayPress = () => {
    const year = getYear();
    const month = getMonth();
    const day = getDay();
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
        />
        {children}

        {!isToday && (
          <RNAnimated.View
            {...panResponder.panHandlers}
            style={[styles.todayButton, animatedStyle]}
          >
            <MyText style={styles.todayButtonText}>오늘</MyText>
          </RNAnimated.View>
        )}
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
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: appColor3,
    borderWidth: 1,
  },
  todayButtonText: {
    color: appColor3,
    userSelect: 'none',
    fontFamily: 'GowunBatang-Bold',
  },
});
