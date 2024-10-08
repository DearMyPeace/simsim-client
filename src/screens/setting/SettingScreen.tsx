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
import { ko } from 'date-fns/locale';
import AiPersonaSelectModal from '@components/setting/AiPersonaSelectModal';
import { userInfoState } from '@stores/login';
import SettingContainer from '@components/setting/SettingContainer';

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
    const time = format(notiTime, 'a hh시 mm분', { locale: ko });
    setSnackbarText(`${time}에 알림이 울립니다`);
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

  const alarmSection = Platform.OS !== 'web' && (
    <NotiSection
      diaryNotiEnabled={diaryNotiEnabled}
      onToggleDiarySwitch={onToggleDiarySwitch}
      letterNotiEnabled={letterNotiEnabled}
      onToggleLetterSwitch={onToggleLetterSwitch}
    />
  );

  const modals = (
    <>
      {Platform.OS !== 'web' && (
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
      )}
      <AiPersonaSelectModal
        visible={aiPickerVisible}
        setIsVisible={setAiPickerVisible}
        aiPersonaList={aiPersonaList}
      />
    </>
  );

  return (
    <SettingContainer alarmSection={alarmSection} modals={modals}>
      <SettingSection label="나의 정보" content={userInfo.email} onPress={onMyInfo} />
      <SettingSection label="편지 작성자" content={userInfo.personaName} onPress={aiPickerOpen} />
      <SettingSection label="의견 보내기" content="보내기" onPress={onFeedback} />
      <SettingSection label="심심조각 방침" content="방침 보기" onPress={onViewTerms} />
    </SettingContainer>
  );
};

const styles = StyleSheet.create({});

export default SettingScreen;
