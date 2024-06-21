import React, { useState } from 'react';
import MyText from '@components/common/MyText';
import { ScrollView, View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Icon } from 'react-native-paper';
import { IDiaryCardProps } from '@type/Diary';
import { format } from 'date-fns';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Platform.OS === 'web' ? 800 : width - 32;

const DiaryCard = ({ createdTime, content }: IDiaryCardProps) => {
  const [timeToShow, setTimeToShow] = useState(format(createdTime, 'HH:mm a'));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* 시간 */}
        <View style={styles.header}>
          <MyText>{timeToShow}</MyText>
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
    paddingVertical: 6,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  card: {
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
