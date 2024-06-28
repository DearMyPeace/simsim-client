import React, { useState } from 'react';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { userAiPersonaStatus } from '@stores/userAiPersona';
import { snackMessage } from '@stores/snackMessage';
import { fetchAiPersonaList } from '@api/ai/get';

// todo: api 요청으로 받아오기
const mockAiPersona = [
  { id: 'FeelingAi', label: '공감형', value: '공감형' },
  { id: 'ThinkingAi', label: '사고형', value: '사고형' },
];

const useAiPersonaGet = () => {
  const setUserSelectedAi = useSetRecoilState(userAiPersonaStatus);
  const [aiPickerVisible, setAiPickerVisible] = useState<boolean>(false);
  const setSnackbar = useSetRecoilState(snackMessage);
  const { data, isError, isPending } = useQuery({
    queryKey: ['aiPersona'],
    queryFn: fetchAiPersonaList,
    enabled: aiPickerVisible,
  });

  const aiPickerOpen = () => {
    if (isError) {
      setAiPickerVisible(false);
      setSnackbar('목록을 불러오는 중 오류가 발생했습니다');
      return;
    }
    setAiPickerVisible(true);
  };

  const onSelectAi = (aiPersona: ItemValue) => {
    setUserSelectedAi(aiPersona as string);
    setAiPickerVisible(false);
  };
  return {
    aiPickerVisible,
    setAiPickerVisible,
    aiPickerOpen,
    onSelectAi,
    aiPersonaList: data || [],
    isError,
    isPending,
  };
};

export default useAiPersonaGet;
