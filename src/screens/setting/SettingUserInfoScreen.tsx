import React from 'react';
import MyText from '@components/common/MyText';
import { SafeAreaView, StyleSheet, ScrollView, View, Platform } from 'react-native';
import SettingSection from '@components/setting/SettingSection';
import NotiSection from '@components/setting/NotiSection';
import useAiPersonaGet from '@hooks/setting/aiPersonaGetHook';
import useNotification from '@hooks/setting/notificationHook';
import useSetting from '@hooks/setting/settingHook';
import DatePicker from 'react-native-date-picker';
import BasicBottomSheet from '@components/common/BasicBottomSheet';
import { useRecoilState, useRecoilValue } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import MySnackbar from '@components/common/MySnackbar';
import AiPersonaSelectModal from '@components/setting/AiPersonaSelectModal';
import { userInfoState } from '@stores/login';
import BasicConfirmModal from '@components/common/BasicConfirmModal';

const SettingUserInfoScreen = () => {
  const {
    deleteModalVisible,
    setDeleteModalVisible,
    onConfirmDeleteAccount,
    onFeedback,
    onLogout,
    onDeleteAccount,
  } = useSetting();
  const {
    diaryNotiEnabled,
    letterNotiEnabled,
    timePickerVisible,
    setDiaryNotiEnabled,
    setTimePickerVisible,
    onToggleDiarySwitch,
    onToggleLetterSwitch,
  } = useNotification();
  const { aiPickerVisible, setAiPickerVisible, aiPickerOpen, aiPersonaList } = useAiPersonaGet();
  const userInfo = useRecoilValue(userInfoState);
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
          {/* todo: mobile에서 나의 정보는 알림 위에 위치 */}
          <SettingSection label="나의 정보" content={userInfo.email} onPress={() => {}} />
          <SettingSection
            label="편지 작성자"
            content={userInfo.personaName}
            onPress={aiPickerOpen}
          />
          <SettingSection label="!!!의견 보내기" content="보내기" onPress={onFeedback} />
          {/* <SettingSection label="로그아웃" content="나가기" onPress={onLogout} /> */}
          <SettingSection label="심심조각 방침" content="방침 보기" onPress={() => {}} />
          {/* <SettingSection label="회원탈퇴" content="탈퇴하기" onPress={onDeleteAccount} /> */}
        </View>
      </ScrollView>
      <BasicBottomSheet
        visible={timePickerVisible}
        setVisible={setTimePickerVisible}
        onClose={onTimePickerClose}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
      <AiPersonaSelectModal
        visible={aiPickerVisible}
        setIsVisible={setAiPickerVisible}
        aiPersonaList={aiPersonaList}
      />
      <BasicConfirmModal
        visible={deleteModalVisible}
        setIsVisible={setDeleteModalVisible}
        onConfirm={onConfirmDeleteAccount}
        content={`정말로 탈퇴하시겠습니까?\n작성한 모든 심심기록이 지워집니다.`}
      />
      <View style={styles.footer}>
        <MyText size={11}>심심조각 초판</MyText>
      </View>
      <MySnackbar visible={snackbarText !== ''} style={{ marginBottom: 45, flex: 1 }} />
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

export default SettingUserInfoScreen;
