import React, { LegacyRef, useRef, useState } from 'react';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ViewStyle,
  Switch,
  Modal,
  Platform,
  Pressable,
  Linking,
  Alert,
  StyleProp,
  TextStyle,
} from 'react-native';
import MyModal from '@components/common/MyModal';
import { Picker, PickerItemProps, PickerProps } from '@react-native-picker/picker';
import BasicBottomSheet from '@components/common/BasicBottomSheet';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { fontLarge, fontMedium } from '@utils/Sizing';
import SettingSection from '@components/setting/SettingSection';
import NotiSection from '@components/setting/NotiSection';
import BasicPicker from '@components/common/BasicPicker';
import BottomSheetPicker from '@components/common/BottomSheetPicker';

// todo: 유저 정보에서 받아오기
const aiPersona = '공감형';
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

  function aiPickerClose() {
    setAiSelectVisible(false);
  }

  const aiPersonalityItems = [
    { id: 'FeelingAi', label: '공감형', value: '공감형' },
    { id: 'ThinkingAi', label: '사고형', value: '사고형' },
  ];

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

  const onAiSelectButtonPress = () => {
    setAiSelectVisible(!aiSelectVisible);
  };

  const onSelectAi = (itemValue: ItemValue) => {
    setSelectedAi(itemValue as string);
    setAiSelectVisible(false);
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
      <MyModal
        visible={modalVisible}
        setIsVisible={setModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContent}>
          <MyText>정말로 탈퇴하시겠습니까?</MyText>
          <MyText>작성한 모든 심심기록이 지워집니다.</MyText>
        </View>
        <View style={[styles.row, styles.modalButtons]}>
          <TextButton onPress={onDeleteAccount}>취소</TextButton>
          <TextButton onPress={onDeleteAccount}>확인</TextButton>
        </View>
      </MyModal>
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
  sectionContainer: {
    flexDirection: 'column',
    paddingTop: 11,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentContainer: {
    width: 300,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent: {
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtons: {
    width: '75%',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5D5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  sectionContentContainer: {
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 7,
    marginBottom: 15,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default SettingScreen;
