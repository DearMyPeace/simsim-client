import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyCalendar from '@components/diary/calendar/MyCalendar';
import DiaryCarousel from '@components/diary/carousel/DiaryCarousel';
import useCalendarHook from '@hooks/diary/calendarHook';

const DiaryScreen = () => {
  const { selectedDate, onDayPress, dateStatus } = useCalendarHook();

  return (
    <View style={styles.container}>
      <MyCalendar selectedDate={selectedDate} onDayPress={onDayPress} />
      <DiaryCarousel selectedDate={selectedDate} dateStatus={dateStatus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default DiaryScreen;
