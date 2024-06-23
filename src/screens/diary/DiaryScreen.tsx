import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyCalendar from '@components/diary/calendar/MyCalendar';
import DiaryCarousel from '@components/diary/carousel/DiaryCarousel';
import useCalendarHook from '@hooks/diary/calendarHook';
import MySnackbar from '@components/common/MySnackbar';
import { useRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';

const DiaryScreen = () => {
  const { selectedDate, onDayPress, onMonthChange, dateStatus, markedDates } = useCalendarHook();
  const [snackbarText, setSnackbarText] = useRecoilState(snackMessage);
  const onDissmissSnackbar = () => {
    setSnackbarText('');
  };

  return (
    <>
      <View style={styles.container}>
        <MyCalendar
          selectedDate={selectedDate}
          markedDates={markedDates}
          onDayPress={onDayPress}
          onMonthChange={onMonthChange}
        />
        <DiaryCarousel selectedDate={selectedDate} dateStatus={dateStatus} />
      </View>
      <MySnackbar
        visible={snackbarText !== ''}
        text={snackbarText}
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
