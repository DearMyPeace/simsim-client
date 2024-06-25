import React, { useState } from 'react';
import MyText from '@components/common/MyText';
import { SafeAreaView, StyleSheet, ScrollView, View, Platform, Linking, Alert } from 'react-native';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import SettingSection from '@components/setting/SettingSection';
import NotiSection from '@components/setting/NotiSection';
import BottomSheetPicker from '@components/common/BottomSheetPicker';
import DeleteAccountModal from '@components/setting/DeleteAccountModal';

// todo: api 요청으로 받아오기
const aiPersona = '공감형';
const aiPersonalityItems = [
  { id: 'FeelingAi', label: '공감형', value: '공감형' },
  { id: 'ThinkingAi', label: '사고형', value: '사고형' },
];

const SettingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAi, setSelectedAi] = useState<string>(aiPersona);
  const [aiSelectVisible, setAiSelectVisible] = useState(false);
  const [diaryNotiStatus, setDiaryNotiStatus] = useState(false);
  const [letterNotiStatus, setLetterNotiStatus] = useState(false);

  const onToggleDiarySwitch = () => {
    setDiaryNotiStatus((previousState) => !previousState);
  };

  const onToggleLetterSwitch = () => {
    setLetterNotiStatus((previousState) => !previousState);
  };

  function aiPickerOpen() {
    setAiSelectVisible(true);
  }

  const onSelectAi = (itemValue: ItemValue) => {
    setSelectedAi(itemValue as string);
    setAiSelectVisible(false);
  };

  const onFeedback = async () => {
    const url = 'https://forms.gle/nUCrj6JLNCnU8Dez6'; // env에 추가하기
    try {
      console.log('Checking if URL can be opened:', url);
      const supported = await Linking.canOpenURL(url);
      console.log('Supported:', supported);

      if (supported) {
        console.log('Opening URL:', url);
        await Linking.openURL(url);
      } else {
        Alert.alert(`해당 링크로 이동할 수 없습니다 (${url})`);
      }
    } catch (error: any) {
      console.error('An error occurred', error);
      Alert.alert('오류가 발생했습니다', error.message);
    }
  };

  const onDeleteAccount = () => {
    setModalVisible(false);
  };

  const onLogout = () => {
    console.log('logout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {Platform.OS !== 'web' && (
          <NotiSection
            diaryNotiStatus={diaryNotiStatus}
            onToggleDiarySwitch={onToggleDiarySwitch}
            letterNotiStatus={letterNotiStatus}
            onToggleLetterSwitch={onToggleLetterSwitch}
          />
        )}
        <View style={styles.basicPadding}>
          <SettingSection label="편지 작성자" buttonText={aiPersona} onPress={aiPickerOpen} />
          <SettingSection label="의견 보내기" buttonText="보내기" onPress={onFeedback} />
          <SettingSection label="로그아웃" buttonText="나가기" onPress={onLogout} />
          <SettingSection label="회원탈퇴" buttonText="탈퇴하기" onPress={onDeleteAccount} />
        </View>
      </ScrollView>
      <BottomSheetPicker
        visible={aiSelectVisible}
        setVisible={setAiSelectVisible}
        selectedValue={selectedAi}
        onValueChange={onSelectAi}
        items={aiPersonalityItems}
      />
      <DeleteAccountModal visible={modalVisible} setIsVisible={setModalVisible} />
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
