import React from 'react';
import MyText from '@components/common/MyText';
import { StyleSheet, View } from 'react-native';
import { fontLarge } from '@utils/Sizing';
import MySwitch from '@components/common/MySwitch';

interface INotiSectionProps {
  diaryNotiEnabled: boolean;
  onToggleDiarySwitch: () => void;
  letterNotiEnabled: boolean;
  onToggleLetterSwitch: () => void;
}

const NotiSection = ({
  diaryNotiEnabled,
  onToggleDiarySwitch,
  letterNotiEnabled,
  onToggleLetterSwitch,
}: INotiSectionProps) => {
  return (
    <View style={{ paddingHorizontal: 24 }}>
      <MyText size={fontLarge} style={{ paddingVertical: 11 }} bold>
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
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 3,
    borderBottomColor: '#D5D5D5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
});

export default NotiSection;
