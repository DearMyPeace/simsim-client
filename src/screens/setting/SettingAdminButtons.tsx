import React from 'react';
import SettingSection from '@components/setting/SettingSection';
import { fetchExportDiary, fetchExportReport } from '@api/admin/get';

function SettingAdminButtons() {
  const onGetDiary = () => {
    fetchExportDiary();
  };

  const onGetReport = () => {
    fetchExportReport();
  };

  return (
    <>
      <SettingSection label="기록 가져오기" onPress={onGetDiary} />
      <SettingSection label="편지 가져오기" onPress={onGetReport} />
    </>
  );
}

export default SettingAdminButtons;
