import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Platform } from 'react-native';
import MyText from '@components/common/MyText';
import { Icon } from 'react-native-paper';

const { width } = Dimensions.get('window');

const PaginationDot = ({ active }: { active: boolean }) => {
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: active ? '#C48E24' : '#C4C4C4',
        marginHorizontal: 4,
      }}
    />
  );
};

const DiaryCarousel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* 시간 */}
        <View style={styles.header}>
          <MyText>오늘</MyText>
          {Platform.OS === 'web' ? <Icon source="dots-horizontal" size={16} /> : null}
          <Icon source="close" size={16} />
        </View>
        {/* 다이어리 */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <MyText>
              오늘은 정말 행복한 하루였다. 아침부터 밝은 햇살이 나를 반겨주었고, 출근길에는 신나는
              음악이 내 기분을 더욱 들뜨게 했다. 회사에서 칭찬도 받고, 동료들과 점심으로 먹은 피자는
              너무 맛있었다. 퇴근 후에는 오랜 친구를 만나 즐거운 대화를 나누며 웃음이 끊이지 않았다.
              오늘 같은 날이 계속 이어졌으면 좋겠다.
            </MyText>
          </View>
        </ScrollView>
      </View>
      <PaginationDot active />
    </View>
  );
};

export default DiaryCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 6,
    paddingBottom: 24,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F1E2CC',
    borderRadius: 12,
    marginHorizontal: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 10,
  },
});
