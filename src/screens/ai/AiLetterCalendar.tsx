import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, PanResponder, Animated as RNAnimated } from 'react-native';
import { format } from 'date-fns';
import { IDate, IDay } from '@type/Diary';
import { CalendarProvider } from 'react-native-calendars';
import { appColor3 } from '@utils/colors';
import AiLetterCalendarHeader from '@screens/ai/AiLetterCalendarHeader';
import MyText from '@components/common/MyText';

const { width, height } = Dimensions.get('window');

const getYear = () => format(new Date(), 'yyyy');
const getMonth = () => format(new Date(), 'MM') as IDate['month'];
const getDay = () => format(new Date(), 'dd');

const AiLetterCalendar = ({ children, onMonthChange }) => {
  const [isToday, setIsToday] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedDate, setSelectedDate] = useState<IDay>({
    year: getYear(),
    month: getMonth(),
    day: getDay(),
  });

  const position = useRef(new RNAnimated.ValueXY({ x: 0, y: 0 })).current;

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
      console.log('ExpandableCalendarScreen onMonthChange: ', date);
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
    console.log('press today ');
    if (!isDragging) {
      console.log('!is dragging ');
      const year = getYear();
      const month = getMonth();
      const day = getDay();
      setSelectedDate({ year, month, day });
      onMonthChange(`${year}-${month}`);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setIsDragging(true);
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });
        setIsDragging(true);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      },
      onPanResponderRelease: () => {
        position.flattenOffset();
        timerRef.current = setTimeout(() => {
          setIsDragging(false);
        }, 100); // 드래그 상태를 해제하기 전에 잠깐의 딜레이를 추가하여 드래그 완료를 감지합니다.
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
            <MyText style={styles.todayButtonText} onPress={handleTodayPress}>
              오늘
            </MyText>
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
  },
  todayButtonText: {
    color: appColor3,
    userSelect: 'none',
  },
});
