import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MyCalendar from '@components/diary/calendar/MyCalendar';
import DiaryCarousel from '@components/diary/carousel/DiaryCarousel';
import MySnackbar from '@components/common/MySnackbar';
import { paddingLarge } from '@utils/Sizing';
import { useRecoilValue } from 'recoil';
import { snackMessage } from '@stores/snackMessage';

const DiaryScreen = () => {
  const snackbarText = useRecoilValue(snackMessage);
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <MyCalendar />
        <DiaryCarousel />
      </ScrollView>
      <MySnackbar visible={snackbarText !== ''} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: paddingLarge,
    paddingVertical: 10,
  },
});

export default DiaryScreen;
