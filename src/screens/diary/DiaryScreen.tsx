import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyCalendar from '@components/diary/calendar/MyCalendar';
import DiaryCarousel from '@components/diary/carousel/DiaryCarousel';
import useCalendarHook from '@hooks/diary/calendarHook';
import MySnackbar from '@components/common/MySnackbar';
import { paddingLarge } from '@utils/Sizing';

const DiaryScreen = () => {
  const { selectedDate, onDayPress, onMonthChange, markedDates, snackbarText } = useCalendarHook();

  return (
    <>
      <View style={styles.container}>
        <MyCalendar
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
    paddingHorizontal: paddingLarge,
    paddingVertical: 10,
  },
});

export default DiaryScreen;
