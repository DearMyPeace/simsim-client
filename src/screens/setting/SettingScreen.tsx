import React from 'react';
import MyText from '@components/common/MyText';
import { SafeAreaView, StyleSheet, ScrollView, View, Platform } from 'react-native';
import SettingSection from '@components/setting/SettingSection';
import NotiSection from '@components/setting/NotiSection';
import BottomSheetPicker from '@components/common/BottomSheetPicker';
import DeleteAccountModal from '@components/setting/DeleteAccountModal';
import useAiPickerHook from '@hooks/setting/aiPickerHook';
import useNotification from '@hooks/setting/notificationHook';
import useSetting from '@hooks/setting/settingHook';
import DatePicker from 'react-native-date-picker';
import BasicBottomSheet from '@components/common/BasicBottomSheet';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import MySnackbar from '@components/common/MySnackbar';

const SettingScreen = () => {
  const { deleteModalVisible, setDeleteModalVisible, onFeedback, onDeleteAccount, onLogout } =
    useSetting();
  const {
    diaryNotiEnabled,
    letterNotiEnabled,
    timePickerVisible,
    setDiaryNotiEnabled,
    setTimePickerVisible,
    onToggleDiarySwitch,
    onToggleLetterSwitch,
  } = useNotification();
  const {
    selectedAi,
    aiPickerVisible,
    setAiPickerVisible,
    aiPickerOpen,
    onSelectAi,
    aiPersonaList,
  } = useAiPickerHook();
  const [notiTime, setNotiTime] = React.useState(new Date());
  const onTimePickerClose = () => {
    setDiaryNotiEnabled(true);
    const time = format(notiTime, 'a hh시 mm분', { locale: ko });
    setSnackbarText(`${time}에 알림이 울립니다`);
  };
  const [snackbarText, setSnackbarText] = useRecoilState(snackMessage);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {Platform.OS !== 'web' && (
          <NotiSection
            diaryNotiEnabled={diaryNotiEnabled}
            onToggleDiarySwitch={onToggleDiarySwitch}
            letterNotiEnabled={letterNotiEnabled}
            onToggleLetterSwitch={onToggleLetterSwitch}
          />
        )}
        <View style={styles.basicPadding}>
          <SettingSection label="편지 작성자" buttonText={selectedAi} onPress={aiPickerOpen} />
          <SettingSection label="의견 보내기" buttonText="보내기" onPress={onFeedback} />
          <SettingSection label="로그아웃" buttonText="나가기" onPress={onLogout} />
          <SettingSection label="회원탈퇴" buttonText="탈퇴하기" onPress={onDeleteAccount} />
        </View>
      </ScrollView>
      <BasicBottomSheet
        visible={timePickerVisible}
        setVisible={setTimePickerVisible}
        onClose={onTimePickerClose}
      >
        <DatePicker
          mode="time"
          locale="ko-KR"
          date={notiTime}
          minuteInterval={10}
          onDateChange={setNotiTime}
          dividerColor="black"
        />
      </BasicBottomSheet>
      <BottomSheetPicker
        visible={aiPickerVisible}
        setVisible={setAiPickerVisible}
        selectedValue={selectedAi}
        onValueChange={onSelectAi}
        items={aiPersonaList}
      />
      <DeleteAccountModal visible={deleteModalVisible} setIsVisible={setDeleteModalVisible} />
      <MySnackbar
        visible={snackbarText !== ''}
        text={snackbarText}
        onDissmiss={() => setSnackbarText('')}
        style={{ marginBottom: 45, flex: 1 }}
      />
      <View style={styles.footer}>
        <MyText size={11}>심심조각 초판</MyText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
    paddingBottom: 10,
  },
  basicPadding: {
    paddingHorizontal: 24,
  },
  footer: {
    paddingVertical: 7,
    marginBottom: 15,
  },
});

export default SettingScreen;
