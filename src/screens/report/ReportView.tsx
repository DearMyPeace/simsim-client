import React, { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MyText from '@components/common/MyText';
import { fontLarge } from '@utils/Sizing';
import ChartWrapper from '@screens/report/ChartWrapper';
import { fetchWeekReport, fetchReportPNN } from '@api/report/get';
import ReportLoadingView from './ReportLoadingView';
import ReportErrorView from './ReportErrorView';
import { DayEmotionData, EmotionData } from '@type/IReport';

const Report = () => {
  const targetDate = new Date().toISOString().slice(0, 10);
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(['weekReport', targetDate]);
      queryClient.invalidateQueries(['reportPNN', targetDate]);
    }, [queryClient, targetDate]),
  );

  const {
    data: emotionData,
    isLoading: isLoadingEmotionData,
    error: emotionDataError,
  } = useQuery<EmotionData>({
    queryKey: ['weekReport', targetDate],
    queryFn: () => fetchWeekReport(targetDate),
  });

  const {
    data: dayEmotionData,
    isLoading: isLoadingDayEmotionData,
    error: dayEmotionDataError,
  } = useQuery<DayEmotionData>({
    queryKey: ['reportPNN', targetDate],
    queryFn: () => fetchReportPNN(targetDate),
  });

  if (isLoadingEmotionData || isLoadingDayEmotionData) {
    return <ReportLoadingView />;
  }

  if (emotionDataError || dayEmotionDataError) {
    return <ReportErrorView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <MyText style={styles.title}>N번의 기록</MyText>
          <MyText style={styles.content}>인상깊은 마음의 기록 조각</MyText>
        </View>
      </View>
      <View style={styles.wrapperContainer}>
        <ChartWrapper emotionData={emotionData} dayEmotionData={dayEmotionData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '80%',
    height: '80%',
  },
  headerContainer: {
    flex: 1,
    paddingTop: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '60%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  wrapperContainer: {
    flex: 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    minWidth: 250,
  },
  title: {
    fontSize: fontLarge,
    fontFamily: 'GowunBatang-Bold',
    textAlign: 'left',
  },
  content: {
    textAlign: 'left',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Report;
