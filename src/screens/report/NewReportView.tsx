import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { fontMedium, fontLarge } from '@utils/Sizing';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import MyText from '@components/common/MyText';
import NewChartView from '@screens/report/NewChartView';
import { appColor1 } from '@utils/colors';
import CalendarSelectModal from '@components/diary/calendar/CalendarSelectModal';
import { kMonth } from '@utils/localeConfig';

function NewReportView() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedMonth, setSelectedMonth] = useState<number>(
    parseInt(selectedDate.slice(5, 7), 10),
  );
  const [selectedYear, setSelectedYear] = useState<number>(parseInt(selectedDate.slice(0, 4), 10));

  const handleModalDismiss = () => {
    const day = selectedDate.slice(8, 10);
    const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
    const month = selectedMonth.toString().padStart(2, '0');
    if (parseInt(day, 10) > lastDay) {
      setSelectedDate(`${selectedYear}-${month}-${lastDay}`);
    } else {
      setSelectedDate(`${selectedYear}-${month}-${day}`);
    }
    setModalVisible(false);
  };

  const onHeaderPress = () => {
    setModalVisible(true);
  };

  const onLeftPress = () => {
    selectedMonth === 1 ? setSelectedMonth(12) : setSelectedMonth(selectedMonth - 1);
  };

  const onRightPress = () => {
    selectedMonth === 11 ? setSelectedMonth(1) : setSelectedMonth(selectedMonth + 1);
  };

  const keyword = '건강';
  const content = `날씨가 추워질수록 건강에 대한 언급이 많아졌어요. 다음주부터는 더 춥다고 하니, 따뜻하게 입는다면 건강에 대한 걱정이 덜 할 것 같아요.
  목을 따뜻하게 감싸면 체온이 3도 이상 올라가는 효과가 있다고 해요. 저번에 지수에게 선물받은 부드러운 앙고라 목도리를 해보는건 어떤가요?`;

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 16 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onLeftPress}>
            <CalendarArrow direction="left" size={30} style={null} />
          </Pressable>
          <Pressable onPress={onHeaderPress}>
            <MyText size={fontLarge} bold>
              {kMonth[selectedMonth - 1]}의 기억 조각
            </MyText>
          </Pressable>
          <CalendarSelectModal
            isModalVisible={isModalVisible}
            handleModalDismiss={handleModalDismiss}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />
          <Pressable onPress={onRightPress}>
            <CalendarArrow direction="right" size={30} />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={styles.mainContainer}
          showsVerticalScrollIndicator={false}
        >
          <NewChartView />
          <View style={{ marginVertical: 16 }}>
            <MyText>{kMonth[selectedMonth - 1]}에 가장 많이 언급한 단어를 모아봤어요.</MyText>
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
