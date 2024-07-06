import React from 'react';
import { StyleSheet, Image } from 'react-native';
import SettingSection from '@components/setting/SettingSection';
import useSetting from '@hooks/setting/settingHook';
import BasicConfirmModal from '@components/common/BasicConfirmModal';
import SettingContainer from '@components/setting/SettingContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingUserInfoScreen = () => {
  const {
    deleteModalVisible,
    setDeleteModalVisible,
    onConfirmDeleteAccount,
    onLogout,
    onDeleteAccount,
    userEmail,
    userProvider,
  } = useSetting();

  const modals = (
    <BasicConfirmModal
      visible={deleteModalVisible}
      setIsVisible={setDeleteModalVisible}
      onConfirm={onConfirmDeleteAccount}
      content={`정말로 탈퇴하시겠습니까?\n작성한 모든 심심기록이 지워집니다.`}
    />
  );

  const googleIcon = (
    <Image
      source={require('@assets/logo/google.png')}
      style={styles.googleIcon}
      resizeMode="contain"
    />
  );

  const appleIcon = <Icon name="apple" size={20} color="#000" style={styles.appleIcon} />;

  const icon = userProvider === 'Google' ? googleIcon : appleIcon;

  return (
    <SettingContainer modals={modals}>
      <SettingSection label="나의 정보" content={userEmail} />
      <SettingSection label="연동 계정" content={userProvider} icon={icon} />
      <SettingSection label="로그아웃" content="나가기" onPress={onLogout} />
      <SettingSection
        label="회원탈퇴"
        content="탈퇴하기"
        onPress={onDeleteAccount}
        textColor="#EB6D52"
      />
    </SettingContainer>
  );
};

const styles = StyleSheet.create({
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  appleIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default SettingUserInfoScreen;
