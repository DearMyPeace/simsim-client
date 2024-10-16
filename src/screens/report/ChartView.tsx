import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { appColor1, appColor2, appColor3, appColor4 } from '@utils/colors';
import CustomLoadingControlWrapper from '@screens/common/CustomLoadingControlWrapper';
import MyText from '@components/common/MyText';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels,
);

const emotionDicData = {
  즐거움: 'appreciationCnt',
  사랑: 'loveCnt',
  행복: 'happyCnt',
  평온: 'tranquilityCnt',
  호기심: 'curiosityCnt',
  놀람: 'surpriseCnt',
  중립: 'neutralTotalCnt',
  슬픔: 'sadCnt',
  분노: 'angryCnt',
  두려움: 'fearCnt',
  부정: 'negativeTotalCnt',
};

const ChartView = ({ emotionData, labels }) => {
  const filteredLabels = labels.filter((label) => emotionData[emotionDicData[label]] > 0);

  if (filteredLabels.length === 0) {
    return (
      <View style={styles.chart}>
        <CustomLoadingControlWrapper />
        <MyText> 표시할 기록 조각이 없어요. </MyText>
        <MyText> 기록을 보내 편지를 받아보세요. </MyText>
      </View>
    );
  }

  return (
    <View style={styles.chart}>
      {'chart'}
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    flex: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default ChartView;
