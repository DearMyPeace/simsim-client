import React from 'react';
import MyText from '@components/common/MyText';
import { ScrollView, View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Icon } from 'react-native-paper';
import { IDiaryCardProps } from '@type/Diary';
import { CARD_WIDTH } from '@utils/Sizing';

const DiaryCard = ({ createdTime, content }: IDiaryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* 시간 */}
        <View style={styles.header}>
          <MyText>{createdTime}</MyText>
          <View style={styles.icons}>
            <Icon source="close" size={16} />
          </View>
        </View>
        {/* 다이어리 */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <MyText>{content}</MyText>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    ...Platform.select({
      web: {
        width: '90%',
        height: '100%',
      },
    }),
  },
  card: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F1E2CC',
    borderRadius: 12,
    marginHorizontal: 6,
    ...Platform.select({
      web: {
        width: '100%',
        height: '100%',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  icons: {
    flexDirection: 'row',
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 10,
  },
});

export default DiaryCard;
