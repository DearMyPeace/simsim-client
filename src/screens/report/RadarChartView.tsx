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
import { Radar, Doughnut } from 'react-chartjs-2';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { appColor1, appColor2, appColor3, appColor3Opacity } from '@utils/colors';
import MyText from '@components/common/MyText';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

const RadarChartView = ({ emotionData, dayEmotionData }) => {
  const emotionChartData = {
    labels: [
      '기쁨',
      '사랑',
      '감사',
      '평온',
      '호기심',
      '놀람',
      '중립',
      '슬픔',
      '분노',
      '두려움',
      '부정',
    ],
    datasets: [
      {
        label: 'Emotion Data',
        backgroundColor: appColor3Opacity(0.4),
        borderColor: appColor3,
        data: [
          emotionData.happyCnt,
          emotionData.loveCnt,
          emotionData.appreciationCnt,
          emotionData.tranquilityCnt,
          emotionData.curiosityCnt,
          emotionData.surpriseCnt,
          emotionData.neutralTotalCnt,
          emotionData.sadCnt,
          emotionData.angryCnt,
          emotionData.fearCnt,
          emotionData.negativeTotalCnt,
        ],
      },
    ],
  };

  const emotionChartOptions = {
    scales: {
      r: {
        ticks: {
          display: false,
          beginAtZero: true,
          max: 50,
        },
        angleLines: {
          color: 'black',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: 'GowunBatang-Regular',
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        radius: 0,
      },
    },
  };

  const dayEmotionChartData = {
    labels: ['긍정적', '중립적', '부정적'],
    datasets: [
      {
        label: 'day Emotion Data',
        backgroundColor: appColor3Opacity(0.4),
        borderColor: [appColor1, appColor2, appColor3],
        data: [
          dayEmotionData.positiveMaxCnt,
          dayEmotionData.neutralMaxCnt,
          dayEmotionData.negativeMaxCnt,
        ],
        pointStyle: 'circle',
        pointBackgroundColor: [appColor1, appColor2, appColor3],
        pointBorderColor: [appColor1, appColor2, appColor3],
        pointRadius: 6,
      },
    ],
  };

  const dayEmotionChartOptions = {
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          max: 60,
          display: false,
        },
        angleLines: {
          color: 'black',
        },
        grid: {
          circular: true,
        },
        pointLabels: {
          display: true,
          font: {
            family: 'GowunBatang-Regular',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: 'GowunBatang-Regular',
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyText style={styles.title}>첫 번째 레이더 차트</MyText>
      <View style={styles.chart}>
        <Radar data={emotionChartData} options={emotionChartOptions} />
      </View>
      <MyText style={styles.title}>두 번째 레이더 차트</MyText>
      <View style={styles.chart}>
        <Radar data={dayEmotionChartData} options={dayEmotionChartOptions} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  chart: {
    width: '100%',
    height: 400,
  },
});

export default RadarChartView;
