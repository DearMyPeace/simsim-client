import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const MyCalendar = () => {
  return (
    <Calendar
      onDayPress={(day) => {
        console.log('selected day', day);
      }}
    />
  );
};

export default MyCalendar;
