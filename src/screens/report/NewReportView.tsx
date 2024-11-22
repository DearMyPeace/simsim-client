import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ICalendarModalDate } from '@type/Diary';
import ReportHeader from './ReportHeader';
import ReportMain from './ReportMain';

function NewReportView() {
  const [selectedDate, setSelectedDate] = useState<ICalendarModalDate>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 16 }}>
      <View style={styles.container}>
        <ReportHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <ScrollView
          contentContainerStyle={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
        >
          <ReportMain selectedDate={selectedDate} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  mainContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

export default NewReportView;
