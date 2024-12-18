import React from 'react';
import MyText from '@components/common/MyText';
import { StyleSheet, View } from 'react-native';
import { fontLarge } from '@utils/Sizing';
import MySwitch from '@components/common/MySwitch';

import useNotification from '@hooks/setting/notificationHook';

import NotiTimePicker from './NotiTimePicker';

const NotiSection = () => {
  const {
    diaryNotiEnabled,
    letterNotiEnabled,
    timePickerVisible,
    setDiaryNotiEnabled,
    setTimePickerVisible,
    onToggleDiarySwitch,
    onToggleLetterSwitch,
  } = useNotification();

  return (
    <View style={styles.container}>
      <MyText size={fontLarge} bold>
        알림
      </MyText>
      <View style={styles.row}>
        <MyText size={fontLarge}>심심기록 알림</MyText>
        <MySwitch value={diaryNotiEnabled} onValueChange={onToggleDiarySwitch} />
      </View>
      <View style={styles.row}>
        <View style={{ flexDirection: 'column' }}>
          <MyText size={fontLarge}>조각편지 알림</MyText>
          <MyText>* 설정시 매일 오후 12시에 알림이 울립니다</MyText>
        </View>
        <MySwitch value={letterNotiEnabled} onValueChange={onToggleLetterSwitch} />
      </View>
      <View style={styles.border} />
      <NotiTimePicker
        timePickerVisible={timePickerVisible}
        setTimePickerVisible={setTimePickerVisible}
        setDiaryNotiEnabled={setDiaryNotiEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  border: {
    borderBottomWidth: 3,
    borderBottomColor: '#D5D5D5',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
});

export default NotiSection;
