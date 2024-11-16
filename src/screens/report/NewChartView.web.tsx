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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import { pieColors } from '@utils/colors';
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
    labels: ['엄청나게 긴 단어라고 합니다', '영화', '날씨', '요리하다', '독서'],
    datasets: [
      {
        data: [30, 20, 20, 15, 15],
        backgroundColor: pieColors,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '40%',
    plugins: {
      datalabels: {
        display: true,
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          // if (value < 5) {
          //   return '';
          // }
          return label.length > 4 ? label.slice(0, 4) + '..' : label;
        },
        color: 'white',
        borderRadius: 4,
        font: {
          family: 'GowunBatang-Bold',
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
  chart: {
    flex: 1,
    marginTop: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
});

export default NewChartView;
