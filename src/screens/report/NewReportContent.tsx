import React from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import MyText from '@components/common/MyText';
import { fontMedium } from '@utils/Sizing';
import { appColor1 } from '@utils/colors';
import { ICalendarModalDate } from '@type/Diary';
import { useReportKeyword } from '@hooks/report/useReportData';

interface INewReportContentProps {
  selectedDate: ICalendarModalDate;
  rank: number;
  onPress: () => void;
}

const NewReportContent = ({ selectedDate, rank, onPress }: INewReportContentProps) => {
  const { keyword, comment } = useReportKeyword({ selectedDate, rank });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MyText size={fontMedium} bold>
        {keyword}
      </MyText>
      <ScrollView contentContainerStyle={{ maxHeight: 300 }} style={{ marginTop: 5 }}>
        <MyText>{comment}</MyText>
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor1,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 16,
    width: '100%',
    flexGrow: 1,
  },
});

export default NewReportContent;
