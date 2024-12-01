import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Animated } from 'react-native';
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
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    setSelectedRank(null);
  }, [selectedDate]);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedRank(null);
      fadeIn();
    });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onKeywordPress = (rank: number) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedRank(rank);
      fadeIn();
    });
  };

  const onPressBackground = () => {
    if (selectedRank) {
      fadeOut();
    }
  };

  if (isPending) {
    return <ReportLoadingView />;
  }
  if (isError || !data) {
    return <ReportErrorView />;
  }

  return (
    <Pressable
      onPress={onPressBackground}
      style={({ hovered }) => [styles.container, hovered && { cursor: 'default' }]}
    >
      <NewChartView
        chartData={data}
        setSelectedRank={setSelectedRank}
        onLabelPress={onKeywordPress}
      />
      <View style={styles.descriptionContainer}>
        <MyText>{kMonth[selectedDate.month - 1]}에 가장 많이 언급한 단어를 모아봤어요.</MyText>
      </View>
      <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
        {selectedRank ? (
          <NewReportContent selectedDate={selectedDate} rank={selectedRank} onPress={fadeOut} />
        ) : (
          <KeywordRank
            keywords={data.map((item) => item.keyword)}
            onKeywordPress={onKeywordPress}
          />
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  descriptionContainer: {
    marginVertical: 16,
  },
  cardContainer: {
    flex: 1,
    width: '100%',
  },
});

export default ReportMain;
