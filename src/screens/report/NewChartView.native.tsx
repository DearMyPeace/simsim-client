import React from 'react';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';
import { pieColors } from '@utils/colors';
import { INewChartViewProps } from '@type/IReport';
import { fontBasic } from '@utils/Sizing';

function NewChartView({ chartData, onLabelPress }: INewChartViewProps) {
  const data = chartData.map((item, index) => ({
    text: item.keyword,
    value: item.rate,
    tooltipText: `${item.keyword}: ${item.rate * 100}%`,
    color: pieColors[index],
  }));

  const onPress = (item: pieDataItem, index: number) => {
    onLabelPress(index + 1);
  };

  return (
    <PieChart
      strokeColor="white"
      strokeWidth={2}
      donut
      showText
      innerCircleBorderColor={'white'}
      innerCircleColor={'#EDEDED'}
      textColor="white"
      radius={150}
      onPress={onPress}
      textSize={fontBasic}
      showTooltip
      font="GowunBatang-Bold"
      labelsPosition="outward"
      data={data}
    />
  );
}

export default NewChartView;
