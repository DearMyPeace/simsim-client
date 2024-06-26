import React, { useState } from 'react';

const useNotification = () => {
  const [diaryNotiEnabled, setDiaryNotiEnabled] = useState(false);
  const [letterNotiEnabled, setLetterNotiEnabled] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const onToggleDiarySwitch = () => {
    setDiaryNotiEnabled((previousState) => !previousState);
    if (diaryNotiEnabled) {
      setTimePickerVisible(false);
    } else {
      setTimePickerVisible(true);
    }
  };

  const onToggleLetterSwitch = () => {
    setLetterNotiEnabled((previousState) => !previousState);
  };

  return {
    diaryNotiEnabled,
    letterNotiEnabled,
    timePickerVisible,
    setDiaryNotiEnabled,
    setLetterNotiEnabled,
    setTimePickerVisible,
    onToggleDiarySwitch,
    onToggleLetterSwitch,
  };
};

export default useNotification;
