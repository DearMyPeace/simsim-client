import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
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
import { IReportData } from '@type/IReport';

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

interface INewChartViewProps {
  chartData: IReportData[];
  onLabelPress: (rank: number) => void;
}

function NewChartView({ chartData, onLabelPress }: INewChartViewProps) {
  const data = {
    labels: chartData.map((item) => item.keyword),
    datasets: [
      {
        data: chartData.map((item) => item.rate),
        backgroundColor: pieColors,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '40%',
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        onLabelPress(clickedIndex + 1);
      }
    },
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
            return `${label}: ${tooltipItem.raw * 100}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Pressable onPress={() => {}} style={styles.container}>
      <Doughnut data={data} options={options} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewChartView;
