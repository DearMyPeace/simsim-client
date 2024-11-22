import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import MyText from '@components/common/MyText';
import { fontMedium } from '@utils/Sizing';
import { appColor1 } from '@utils/colors';
import { ICalendarModalDate } from '@type/Diary';
import { useReportKeyword } from '@hooks/report/useReportData';
import ReportLoadingView from './ReportLoadingView';
import ReportErrorView from './ReportErrorView';

interface INewReportContentProps {
  selectedDate: ICalendarModalDate;
  rank: number;
  setSelectedRank: Dispatch<SetStateAction<number | null>>;
}

const NewReportContent = ({ selectedDate, rank, setSelectedRank }: INewReportContentProps) => {
  const { data, isPending, isError } = useReportKeyword({ selectedDate, rank });

  useEffect(() => {
    console.log(`rank: ${rank}`);
    console.log(data);
  }, [rank, data]);

  const onPress = () => {
    setSelectedRank(null);
  };

  if (isPending) {
    return <ReportLoadingView />;
  }
  if (isError || !data) {
    return <ReportErrorView />;
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MyText size={fontMedium} bold>
        {data?.keyword}
      </MyText>
      <ScrollView contentContainerStyle={{ maxHeight: 300 }} style={{ marginTop: 5 }}>
        <MyText>{data?.content}</MyText>
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
