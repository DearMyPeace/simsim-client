import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '@components/common/MyText';
import { fontLarge } from '@utils/Sizing';
import ChartWrapper from '@screens/report/ChartWrapper';

const Report = () => {
  const emotionData = {
    happyCnt: 39,
    appreciationCnt: 28,
    loveCnt: 8,
    tranquilityCnt: 7,
    curiosityCnt: 28,
    surpriseCnt: 39,
    neutralTotalCnt: 15,
    sadCnt: 10,
    angryCnt: 5,
    fearCnt: 20,
    negativeTotalCnt: 12,
  };

  const dayEmotionData = {
    positiveMaxCnt: 50,
    neutralMaxCnt: 30,
    negativeMaxCnt: 20,
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <MyText style={styles.title}>N번의 기록</MyText>
          <MyText style={styles.content}>인상깊은 마음의 기록 조각</MyText>
        </View>
      </View>
      <View style={styles.wrapperContainer}>
        <ChartWrapper emotionData={emotionData} dayEmotionData={dayEmotionData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '80%',
    height: '80%',
  },
  headerContainer: {
    flex: 1,
    paddingTop: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '60%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  wrapperContainer: {
    flex: 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    minWidth: 250,
  },
  title: {
    fontSize: fontLarge,
    fontFamily: 'GowunBatang-Bold',
    textAlign: 'left',
  },
  content: {
    textAlign: 'left',
    marginBottom: 20,
  },
});

export default Report;
