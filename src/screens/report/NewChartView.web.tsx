import React from 'react';
import { View, StyleSheet } from 'react-native';
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
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import { pieColors } from '@utils/colors';
import MyText from '@components/common/MyText';
import { fontBasic } from '@utils/Sizing';

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

function NewChartView() {
  const data = {
    labels: ['날씨', '영화', '엄청나게 긴 단어라고 합니다', '요리하다', '독서', '기타'],
    datasets: [
      {
        data: [30, 20, 15, 10, 20, 5],
        backgroundColor: pieColors,
        borderWidth: 0,
      },
    ],
  };

  const otherDetails = {
    잠: 3,
    여행: 2,
    음악: 1.5,
    게임: 1.3,
    쇼핑: 0.2,
  };

  const options = {
    responsive: true,
    cutout: '40%',
    plugins: {
      datalabels: {
        display: true,
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          if (value < 5) {
            return '';
          }
          return label.length > 4 ? label.slice(0, 4) + '..' : label;
        },
        color: function (ctx: Context) {
          var index = ctx.dataIndex;
          return index > 2 ? 'white' : 'black';
        },
        borderRadius: 4,
        font: {
          family: 'GowunBatang-Regular',
          size: fontBasic,
        },
        padding: {
          top: 6,
          bottom: 6,
        },
      },
      tooltip: {
        titleFont: {
          family: 'GowunBatang-Bold',
        },
        bodyFont: {
          family: 'GowunBatang-Regular',
        },
        displayColors: false,
        padding: 10,
        callbacks: {
          label: function (tooltipItem: any) {
            const label = tooltipItem.label || '';
            if (label === '기타') {
              let res = '';
              Object.entries(otherDetails).forEach(([key, value]) => {
                res += `${key}: ${value}번 `;
              });
              return res;
            }
            return `${label}: ${tooltipItem.raw}번`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <View style={styles.chart}>
      <Doughnut data={data} options={options} />
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {},
});

export default NewChartView;
