import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { fontMedium, fontLarge } from '@utils/Sizing';
import CalendarArrow from '@components/diary/calendar/CalendarArrow';
import MyText from '@components/common/MyText';
import { appColor1, appColor2, appColor3, appColor4, appColor5 } from '@utils/colors';

function NewReportView() {
  const [targetMonth, setTargetMonth] = useState(new Date().getMonth() + 1);

  const onLeftPress = () => {
    targetMonth === 1 ? setTargetMonth(12) : setTargetMonth(targetMonth - 1);
  };

  const onRightPress = () => {
    targetMonth === 12 ? setTargetMonth(1) : setTargetMonth(targetMonth + 1);
  };

  const keyword = '건강';
  const content = `날씨가 추워질수록 건강에 대한 언급이 많아졌어요. 다음주부터는 더 춥다고 하니, 따뜻하게 입는다면 건강에 대한 걱정이 덜 할 것 같아요.
  목을 따뜻하게 감싸면 체온이 3도 이상 올라가는 효과가 있다고 해요. 저번에 지수에게 선물받은 부드러운 앙고라 목도리를 해보는건 어떤가요?`;

  const keywords = ['건강', '요리', '영화', '운동', '책'];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onLeftPress}>
            <CalendarArrow direction="left" size={30} style={null} />
          </Pressable>
          <MyText size={fontLarge} style={styles.title} bold>
            {targetMonth}월의 기억 조각
          </MyText>
          <Pressable onPress={onRightPress}>
            <CalendarArrow direction="right" size={30} />
          </Pressable>
        </View>
        <View style={styles.chart}>
          <MyText>차트</MyText>
        </View>
        <View style={{ marginVertical: 16 }}>
          <MyText>{targetMonth}월에 가장 많이 언급한 단어를 모아봤어요.</MyText>
        </View>
        <View style={styles.cardContainer}>
          <MyText size={fontMedium} bold>
            {keyword}
          </MyText>
          <ScrollView contentContainerStyle={{ maxHeight: 300 }} style={{ marginTop: 16 }}>
            <MyText>{content}</MyText>
          </ScrollView>
        </View>
      </ScrollView>
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
  },
  title: {
    marginHorizontal: 56,
  },
  chart: {},
  cardContainer: {
    backgroundColor: appColor1,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 16,
    width: '100%',
    marginBottom: 16,
    flexGrow: 1,
  },
});

export default NewReportView;
