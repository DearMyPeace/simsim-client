import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { fontMedium } from '@utils/Sizing';
import MyText from '@components/common/MyText';
import NewChartView from '@screens/report/NewChartView';
import { appColor1 } from '@utils/colors';
import { kMonth } from '@utils/localeConfig';
import { ICalendarModalDate } from '@type/Diary';
import ReportHeader from './ReportHeader';

function NewReportView() {
  const [selectedDate, setSelectedDate] = useState<ICalendarModalDate>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const keyword = '건강';
  const content = `날씨가 추워질수록 건강에 대한 언급이 많아졌어요. 다음주부터는 더 춥다고 하니, 따뜻하게 입는다면 건강에 대한 걱정이 덜 할 것 같아요.
  목을 따뜻하게 감싸면 체온이 3도 이상 올라가는 효과가 있다고 해요. 저번에 지수에게 선물받은 부드러운 앙고라 목도리를 해보는건 어떤가요?`;

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 16 }}>
      <View style={styles.container}>
        <ReportHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <ScrollView
          contentContainerStyle={styles.mainContainer}
          showsVerticalScrollIndicator={false}
        >
          <NewChartView />
          <View style={{ marginVertical: 16 }}>
            <MyText>{kMonth[selectedDate.month - 1]}에 가장 많이 언급한 단어를 모아봤어요.</MyText>
          </View>
          <View style={styles.cardContainer}>
            <MyText size={fontMedium} bold>
              {keyword}
            </MyText>
            <ScrollView contentContainerStyle={{ maxHeight: 300 }} style={{ marginTop: 5 }}>
              <MyText>{content}</MyText>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '80%',
  },
  mainContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: appColor1,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 16,
    width: '100%',
    flexGrow: 1,
  },
});

export default NewReportView;
