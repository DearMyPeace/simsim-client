import React, { useState } from 'react';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { userAiPersonaStatus } from '@stores/userAiPersona';
import { snackMessage } from '@stores/snackMessage';
import { fetchAiPersonaList } from '@api/ai/get';

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

  const onSelectAi = (value: ItemValue) => {
    setUserSelectedAi({ personaCode: value as string, personaName: value as string });
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
