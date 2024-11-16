import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { fontMedium, fontLarge } from '@utils/Sizing';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import MyText from '@components/common/MyText';
import NewChartView from '@screens/report/NewChartView';
import { appColor1 } from '@utils/colors';
import CalendarSelectModal from '@components/diary/calendar/CalendarSelectModal';
import { kMonth } from '@utils/localeConfig';
import useCalendarModal from '@hooks/common/useCalendarModal';
import { ICalendarModalDate } from '@type/Diary';

function NewReportView() {
  const [selectedDate, setSelectedDate] = useState<ICalendarModalDate>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const { isModalVisible, setModalVisible, selectedModalDate, setSelectedModalDate } =
    useCalendarModal({
      month: selectedDate.month,
      year: selectedDate.year,
    });

  useEffect(() => {
    setSelectedModalDate(selectedDate);
  }, [selectedDate]);

  const handleModalDismiss = () => {
    setSelectedDate(selectedModalDate);
    setModalVisible(false);
  };

  const onHeaderPress = () => {
    setModalVisible(true);
  };

  const onLeftPress = () => {
    const { month, year } = selectedDate;
    month === 1
      ? setSelectedDate({ month: 12, year: year - 1 })
      : setSelectedDate({ month: month - 1, year });
  };

  const onRightPress = () => {
    const { month, year } = selectedDate;
    month === 12
      ? setSelectedDate({ month: 1, year: year + 1 })
      : setSelectedDate({ month: month + 1, year });
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
              {kMonth[selectedDate.month - 1]}의 기억 조각
            </MyText>
          </Pressable>
          <CalendarSelectModal
            isModalVisible={isModalVisible}
            handleModalDismiss={handleModalDismiss}
            selectedModalDate={selectedModalDate}
            setSelectedModalDate={setSelectedModalDate}
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
