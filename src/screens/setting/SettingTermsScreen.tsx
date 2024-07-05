import React from 'react';
import { StyleSheet } from 'react-native';
import SettingSection from '@components/setting/SettingSection';
import SettingContainer from '@components/setting/SettingContainer';

const SettingTermsScreen = () => {
  return (
    <SettingContainer>
      <SettingSection label="개인정보 처리방침" onLabelPress={() => {}} />
      <SettingSection label="이용약관" onLabelPress={() => {}} />
      <SettingSection label="오픈 소스 라이브러리" onLabelPress={() => {}} />
      <SettingSection label="사업자 정보" onLabelPress={() => {}} />
    </SettingContainer>
  );
};

const styles = StyleSheet.create({});

export default SettingTermsScreen;
