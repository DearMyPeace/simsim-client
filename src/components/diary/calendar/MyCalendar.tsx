import React, { useEffect, useState } from 'react';
import CalendarArrow, { Direction } from '@components/diary/calendar/CalendarArrow';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { format } from 'date-fns';
import setLocaleConfig from '@utils/localeConfig';

setLocaleConfig();

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
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          textDayFontFamily: 'GowunBatang-Regular',
          textMonthFontFamily: 'GowunBatang-Regular',
          textDayHeaderFontFamily: 'GowunBatang-Regular',
          textDayFontSize: 15,
          textDayHeaderFontSize: 15,
          textMonthFontSize: 20,
          dayTextColor: '#666666',
          arrowColor: '#666666',
          monthTextColor: '#333333',
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
              alignItems: 'center',
            },
            dayHeader: {
              color: '#333333',
              fontFamily: 'GowunBatang-Regular',
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
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 16,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 12,
    marginHorizontal: 14,
    padding: 10,
  },
});
