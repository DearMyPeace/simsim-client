import React from 'react';
import { View, StyleSheet } from 'react-native';

import { PieChart } from 'react-native-gifted-charts';
import { pieColors } from '@utils/colors';

function NewChartView() {
  const keywords = ['건강', '요리', '영화', '운동', '책'];

  const pieData = [
    { value: 5, color: pieColors[5], text: '책' },
    { value: 15, color: pieColors[4], text: '운동' },
    { value: 20, color: pieColors[3], text: '영화' },
    { value: 24, color: pieColors[2], text: '요리' },
    { value: 26, color: pieColors[1], text: '건강' },
  ];

  return (
    <View style={styles.chart}>
      <PieChart
        donut
        isThreeD
        showText
        textColor="black"
        radius={170}
        textSize={20}
        showTextBackground
        textBackgroundRadius={26}
        data={pieData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {},
});

export default NewChartView;
