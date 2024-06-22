import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyCalendar from '@components/diary/calendar/MyCalendar';
import DiaryCarousel from '@components/diary/carousel/DiaryCarousel';
import useCalendarHook from '@hooks/diary/calendarHook';
import MySnackbar from '@components/common/MySnackbar';

const DiaryScreen = () => {
  const { selectedDate, onDayPress, dateStatus, snackbarVisible, setSnackbarVisible } =
    useCalendarHook();

  const onDissmissSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <MyCalendar selectedDate={selectedDate} onDayPress={onDayPress} />
        <DiaryCarousel selectedDate={selectedDate} dateStatus={dateStatus} />
      </View>
      <MySnackbar
        visible={snackbarVisible}
        text="미래의 심심 기록은 작성할 수 없습니다"
        onDissmiss={onDissmissSnackbar}
      />
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
