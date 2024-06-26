import React, { useState } from 'react';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';

// todo: api 요청으로 받아오기
const aiPersona = '공감형';
const aiPersonaList = [
  { id: 'FeelingAi', label: '공감형', value: '공감형' },
  { id: 'ThinkingAi', label: '사고형', value: '사고형' },
];
const useAiPickerHook = () => {
  const [selectedAi, setSelectedAi] = useState<string>(aiPersona);
  const [aiPickerVisible, setAiPickerVisible] = useState(false);

  function aiPickerOpen() {
    setAiPickerVisible(true);
  }

  const onSelectAi = (itemValue: ItemValue) => {
    setSelectedAi(itemValue as string);
    setAiPickerVisible(false);
  };
  return {
    selectedAi,
    aiPickerVisible,
    setAiPickerVisible,
    aiPickerOpen,
    onSelectAi,
    aiPersonaList,
  };
};

export default useAiPickerHook;
