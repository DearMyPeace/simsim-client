import React, { useState } from 'react';

const useNotification = () => {
  const [diaryNotiStatus, setDiaryNotiStatus] = useState(false);
  const [letterNotiStatus, setLetterNotiStatus] = useState(false);
  const onToggleDiarySwitch = () => {
    setDiaryNotiStatus((previousState) => !previousState);
  };

  const onToggleLetterSwitch = () => {
    setLetterNotiStatus((previousState) => !previousState);
  };

  return {
    diaryNotiStatus,
    letterNotiStatus,
    onToggleDiarySwitch,
    onToggleLetterSwitch,
  };
};

export default useNotification;
