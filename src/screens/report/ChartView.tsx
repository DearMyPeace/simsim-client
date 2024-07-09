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
import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { appColor1, appColor2, appColor3, appColor4 } from '@utils/colors';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

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
  const doughnutChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Emotion Data',
        data: labels.map((label) => emotionData[emotionDicData[label]]),
        backgroundColor: [appColor1, appColor2, appColor3, appColor4],
      },
    ],
  };

  const doughnutChartOptions = {
    cutout: '50%',
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'GowunBatang-Regular',
          },
        },
      },
    },
  };

  return (
    <View style={styles.chart}>
      <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
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
