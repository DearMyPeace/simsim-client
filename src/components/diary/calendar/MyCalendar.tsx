import React, { useEffect } from 'react';
import CalendarArrow, { Direction } from '@components/diary/calendar/CalendarArrow';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import setLocaleConfig from '@utils/localeConfig';
import { IDiaryCountResponse as IDiaryCount, IMarkedDates } from '@type/Diary';
import { dotColors } from '@utils/colors';

setLocaleConfig();
interface IMyCalendarProps {
  selectedDate: string;
  markedDates: IDiaryCount[];
  onDayPress: (date: DateData) => void;
  onMonthChange: (date: DateData) => void;
}

const MyCalendar = ({ selectedDate, markedDates, onDayPress, onMonthChange }: IMyCalendarProps) => {
  const markedDatesList: IMarkedDates = markedDates.reduce((acc, date) => {
    acc[date.markedDate] = { marked: true, dotColor: dotColors[date.diaryCount] };
    return acc;
  }, {} as IMarkedDates);

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
            headerContainer: { position: 'absolute', flexDirection: 'row', left: 10, gap: 20 },
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
        onMonthChange={onMonthChange}
        markedDates={{
          [selectedDate]: { selected: true },
          ...markedDatesList,
        }}
        renderArrow={(direction: Direction) => <CalendarArrow direction={direction} />}
      />
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
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
