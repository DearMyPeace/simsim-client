import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import BasicBottomSheet from '@components/common/BasicBottomSheet';
import { useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { format } from 'date-fns';
import { formatTimeToKorean } from '@utils/dateUtils';
import MyText from '@components/common/MyText';
import { fontLarge, fontMedium } from '@utils/Sizing';

interface INotiTimePickerProps {
  timePickerVisible: boolean;
  setTimePickerVisible: Dispatch<SetStateAction<boolean>>;
  setDiaryNotiEnabled: Dispatch<SetStateAction<boolean>>;
}

const NotiTimePicker = ({
  timePickerVisible,
  setTimePickerVisible,
  setDiaryNotiEnabled,
}: INotiTimePickerProps) => {
  const [notiTime, setNotiTime] = useState(new Date());
  const setSnackbarText = useSetRecoilState(snackMessage);
  const onTimePickerClose = () => {
    setDiaryNotiEnabled(true);
    const time = format(notiTime, 'a hh시 mm분');
    setSnackbarText(`${formatTimeToKorean(time)}에 알림이 울립니다`);
  };

  return (
    <BasicBottomSheet
      visible={timePickerVisible}
      setVisible={setTimePickerVisible}
      onClose={onTimePickerClose}
    >
      <View style={styles.container}>
        <MyText size={fontMedium} bold style={styles.header}>
          심심기록 알림 시간
        </MyText>
        <DatePicker
          mode="time"
          locale="ko-KR"
          date={notiTime}
          minuteInterval={10}
          onDateChange={setNotiTime}
          dividerColor="black"
        />
      </View>
    </BasicBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
});

export default NotiTimePicker;
