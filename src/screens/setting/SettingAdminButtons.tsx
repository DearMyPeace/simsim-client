import React, { useState } from 'react';
import { fetchExportDiary, fetchExportReport } from '@api/admin/get';
import ExportCSVButton from './ExportCSVButton';

function SettingAdminButtons() {
  const [diaryData, setDiaryData] = useState('');
  const [letterData, setLetterData] = useState('');

  const onGetDiary = async () => {
    try {
      const data = await fetchExportDiary();
      setDiaryData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onGetLetter = async () => {
    try {
      const data = await fetchExportReport();
      setLetterData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ExportCSVButton
        label="기록 가져오기"
        onPress={onGetDiary}
        data={diaryData}
        filename="simsim_diary.csv"
      />
      <ExportCSVButton
        label="편지 가져오기"
        onPress={onGetLetter}
        data={letterData}
        filename="simsim_letter.csv"
      />
    </>
  );
}

export default SettingAdminButtons;
