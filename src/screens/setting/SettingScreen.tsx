import React from 'react';
import { StyleSheet, View, Platform, Alert, Linking } from 'react-native';
import SettingSection from '@components/setting/SettingSection';
import NotiSection from '@components/setting/NotiSection';
import useAiPersonaGet from '@hooks/setting/aiPersonaGetHook';
import useNotification from '@hooks/setting/notificationHook';
import DatePicker from 'react-native-date-picker';
import BasicBottomSheet from '@components/common/BasicBottomSheet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { format } from 'date-fns';
import AiPersonaSelectModal from '@components/setting/AiPersonaSelectModal';
import { userInfoState } from '@stores/login';
import SettingContainer from '@components/setting/SettingContainer';
import { formatTimeToKorean } from '@utils/dateUtils';
import SettingAdminButtons from './SettingAdminButtons';

// todo: type 수정
const SettingScreen = ({ navigation }: { navigation: any }) => {
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
  const setSnackbarText = useSetRecoilState(snackMessage);
  const onTimePickerClose = () => {
    setDiaryNotiEnabled(true);
    const time = format(notiTime, 'a hh시 mm분');
    setSnackbarText(`${formatTimeToKorean(time)}에 알림이 울립니다`);
  };

  const onFeedback = async () => {
    const url = 'https://forms.gle/nUCrj6JLNCnU8Dez6'; // env에 추가하기
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`해당 링크로 이동할 수 없습니다 (${url})`);
    }
  };

  const onMyInfo = () => {
    navigation.navigate('SettingUserInfo');
  };

  const onViewTerms = () => {
    navigation.navigate('SettingTerms');
  };

  const alarmSection = Platform.OS !== 'web' && <NotiSection />;

  const modals = (
    <AiPersonaSelectModal
      visible={aiPickerVisible}
      setIsVisible={setAiPickerVisible}
      aiPersonaList={aiPersonaList}
    />
  );

  return (
    <SettingContainer alarmSection={alarmSection} modals={modals}>
      <SettingSection label="나의 정보" content={userInfo.email} onPress={onMyInfo} />
      <SettingSection label="편지 작성자" content={userInfo.personaName} onPress={aiPickerOpen} />
      <SettingSection label="의견 보내기" content="보내기" onPress={onFeedback} />
      <SettingSection label="심심조각 방침" content="방침 보기" onPress={onViewTerms} />
      {userInfo.role === 'ADMIN' && Platform.OS === 'web' && <SettingAdminButtons />}
    </SettingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingScreen;
