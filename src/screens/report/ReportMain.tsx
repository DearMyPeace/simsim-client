import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
import NewChartView from '@screens/report/NewChartView';
import { kMonth } from '@utils/localeConfig';
import { ICalendarModalDate } from '@type/Diary';
import NewReportContent from './NewReportContent';
import { useReportData } from '@hooks/report/useReportData';
import ReportLoadingView from './ReportLoadingView';
import ReportErrorView from './ReportErrorView';
import KeywordRank from './KeywordRank';

function ReportMain({ selectedDate }: { selectedDate: ICalendarModalDate }) {
  const { data, isPending, isError } = useReportData(selectedDate);
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  useEffect(() => {
    setSelectedRank(null);
  }, [selectedDate]);

  if (isPending) {
    return <ReportLoadingView />;
  }
  if (isError || !data) {
    return <ReportErrorView />;
  }

  const onKeywordPress = (rank: number) => {
    setSelectedRank(rank);
  };

  return (
    <>
      <View style={styles.container}>
        <NewChartView chartData={data} setSelectedRank={setSelectedRank} />
        <View>
          <MyText>{kMonth[selectedDate.month - 1]}에 가장 많이 언급한 단어를 모아봤어요.</MyText>
        </View>
      </View>
      <View style={styles.cardContainer}>
        {selectedRank ? (
          <NewReportContent
            selectedDate={selectedDate}
            rank={selectedRank}
            setSelectedRank={setSelectedRank}
          />
        ) : (
          <KeywordRank
            keywords={data.map((item) => item.keyword)}
            onKeywordPress={onKeywordPress}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    width: '100%',
  },
});

export default ReportMain;
