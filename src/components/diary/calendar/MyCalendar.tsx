import React, { useEffect, useState } from 'react';
import CalendarArrow, { Direction } from '@components/diary/calendar/CalendarArrow';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { format } from 'date-fns';

const MyCalendar = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    console.log('날짜 선택', selectedDate);
  }, [selectedDate]);

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    console.log('click', day.dateString);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Calendar
        style={styles.container}
        theme={{
          textDayFontFamily: 'Inder-Regular',
          textMonthFontFamily: 'Inder-Regular',
          textDayHeaderFontFamily: 'Inder-Regular',
          textDayFontSize: 15,
          textDayHeaderFontSize: 15,
          textMonthFontSize: 20,
          selectedDayBackgroundColor: '#C48E24',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#C48E24',
          'stylesheet.calendar.header': {
            headerContainer: {
              position: 'absolute',
              flexDirection: 'row',
              left: 10,
              gap: 20,
            },
            header: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 10,
              alignItems: 'center',
            },
          },
        }}
        hideExtraDays
        enableSwipeMonths
        firstDay={1}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true },
        }}
        renderArrow={(direction: Direction) => <CalendarArrow direction={direction} />}
      />
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    padding: 10,
  },
});
