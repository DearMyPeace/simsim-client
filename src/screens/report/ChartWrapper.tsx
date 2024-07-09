import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import MyText from '@components/common/MyText';
import { fontBasic } from '@utils/Sizing';
import ChartView from '@screens/report/ChartView';
import Dailyreport from '@screens/report/DailyReport';

const ReportWrapper = ({ emotionData, dayEmotionData }) => {
  const [selectedTab, setSelectedTab] = useState('긍정적');

  const renderContent = () => {
    switch (selectedTab) {
      case '긍정적':
        return <ChartView emotionData={emotionData} labels={['즐거움', '사랑', '행복']} />;
      case '중립적':
        return <ChartView emotionData={emotionData} labels={['평온', '호기심', '놀람', '중립']} />;
      case '부정적':
        return <ChartView emotionData={emotionData} labels={['슬픔', '분노', '두려움', '부정']} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Pressable
          style={[styles.navItem, selectedTab === '긍정적' && styles.selectedItem]}
          onPress={() => setSelectedTab('긍정적')}
        >
          <MyText style={selectedTab === '긍정적' ? styles.selectedText : styles.navText}>
            긍정적
          </MyText>
        </Pressable>
        <Pressable
          style={[styles.navItem, selectedTab === '중립적' && styles.selectedItem]}
          onPress={() => setSelectedTab('중립적')}
        >
          <MyText style={selectedTab === '중립적' ? styles.selectedText : styles.navText}>
            중립적
          </MyText>
        </Pressable>
        <Pressable
          style={[styles.navItem, selectedTab === '부정적' && styles.selectedItem]}
          onPress={() => setSelectedTab('부정적')}
        >
          <MyText style={selectedTab === '부정적' ? styles.selectedText : styles.navText}>
            부정적
          </MyText>
        </Pressable>
      </View>
      <View style={styles.content}>
        {renderContent()}
        <View style={styles.dailyReportContainer}>
          <Dailyreport />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    width: '95%',
    height: '40%',
    maxHeight: 400,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },
  navItem: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderColor: '#ffcc00',
  },
  selectedItem: {
    height: 40,
    backgroundColor: '#F1E0CC',
    borderColor: '#000',
    borderBottomWidth: 0,
    borderBottomColor: '#ffffff',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  navText: {
    fontSize: fontBasic,
    color: '#000',
  },
  selectedText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'GowunBatang-Bold',
  },
  content: {
    flexDirection: 'column',
    borderRadius: 10,
    // overflow: 'hidden',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    width: '100%',
    height: '100%',
  },
  dailyReportContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    maxWidth: 300,
  },
});

export default ReportWrapper;
