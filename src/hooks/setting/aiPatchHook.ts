import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAiPersonaStatus } from '@stores/userAiPersona';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { snackMessage } from '@stores/snackMessage';
import { patchUserAiPersona } from '@api/user/patch';
import { IAiPersonaData } from '@type/AiPersona';

const useAiPersonaChange = () => {
  const [userAiPersona, setUserAiPersona] = useRecoilState(userAiPersonaStatus);
  const [selectedPersonaCode, setSelectedPersonaCode] = useState<string>(userAiPersona.personaCode);
  const setSnackbar = useSetRecoilState(snackMessage);
  const queryClient = useQueryClient();

  const changeAiPersona = useMutation({
    mutationFn: (personaCode: string) => patchUserAiPersona(personaCode),
    onSuccess: (data: IAiPersonaData) => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      const { personaCode, personaName } = data;
      setUserAiPersona({ personaCode, personaName });
      setSnackbar(`${personaName} AI가 편지를 보냅니다`);
    },
    onError: (error) => {
      setSnackbar('AI 변경 중 오류가 발생했습니다');
    },
  });

  return {
    userAiPersona,
    setUserAiPersona,
    selectedPersonaCode,
    setSelectedPersonaCode,
    setSnackbar,
    changeAiPersona,
  };
};

export default useAiPersonaChange;
