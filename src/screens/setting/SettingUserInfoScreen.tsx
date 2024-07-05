import React from 'react';
import { StyleSheet } from 'react-native';
import SettingSection from '@components/setting/SettingSection';
import useSetting from '@hooks/setting/settingHook';
import { userInfoState } from '@stores/login';
import BasicConfirmModal from '@components/common/BasicConfirmModal';
import { useRecoilValue } from 'recoil';
import SettingContainer from '@components/setting/SettingContainer';

const SettingUserInfoScreen = () => {
  const {
    deleteModalVisible,
    setDeleteModalVisible,
    onConfirmDeleteAccount,
    onLogout,
    onDeleteAccount,
  } = useSetting();
  const userInfo = useRecoilValue(userInfoState);

  const modals = (
    <BasicConfirmModal
      visible={deleteModalVisible}
      setIsVisible={setDeleteModalVisible}
      onConfirm={onConfirmDeleteAccount}
      content={`정말로 탈퇴하시겠습니까?\n작성한 모든 심심기록이 지워집니다.`}
    />
  );

  return (
    <SettingContainer modals={modals}>
      <SettingSection label="나의 정보" content={userInfo.email} />
      <SettingSection label="연동 계정" content={userInfo.providerName} />
      <SettingSection label="로그아웃" content="나가기" onPress={onLogout} />
      <SettingSection label="회원탈퇴" content="탈퇴하기" onPress={onDeleteAccount} />
    </SettingContainer>
  );
};

const styles = StyleSheet.create({});

export default SettingUserInfoScreen;
