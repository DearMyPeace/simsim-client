import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyCalendar from '@components/diary/calendar/MyCalendar';
import DiaryCarousel from '@components/diary/carousel/DiaryCarousel';
import useCalendarHook from '@hooks/diary/calendarHook';
import MySnackbar from '@components/common/MySnackbar';

const DiaryScreen = () => {
  const { selectedDate, onDayPress, onMonthChange, markedDates, snackbarText } = useCalendarHook();

  return (
    <>
      <View style={styles.container}>
        <MyCalendar
          selectedDate={selectedDate}
          markedDates={markedDates}
          onDayPress={onDayPress}
          onMonthChange={onMonthChange}
        />
        <DiaryCarousel selectedDate={selectedDate} />
      </View>
      <MySnackbar visible={snackbarText !== ''} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default DiaryScreen;
