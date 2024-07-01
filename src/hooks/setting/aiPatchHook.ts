import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { snackMessage } from '@stores/snackMessage';
import { patchUserAiPersona } from '@api/user/patch';
import { IAiPersonaData } from '@type/AiPersona';
import { userInfoState } from '@stores/login';

const useAiPersonaChange = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedPersonaCode, setSelectedPersonaCode] = useState<string>(userInfo.personaCode);
  const setSnackbar = useSetRecoilState(snackMessage);
  const queryClient = useQueryClient();

  const changeAiPersona = useMutation({
    mutationFn: (personaCode: string) => patchUserAiPersona(personaCode),
    onSuccess: (data: IAiPersonaData) => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      setUserInfo({ ...userInfo, ...data });
      setSnackbar(`${data.personaName} AI가 편지를 보냅니다`);
    },
    onError: (error) => {
      setSnackbar('AI 변경 중 오류가 발생했습니다');
    },
  });

  return {
    userInfo,
    setUserInfo,
    selectedPersonaCode,
    setSelectedPersonaCode,
    setSnackbar,
    changeAiPersona,
  };
};

export default useAiPersonaChange;
