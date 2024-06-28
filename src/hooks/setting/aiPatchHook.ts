import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAiPersonaStatus } from '@stores/userAiPersona';
import { useMutation } from '@tanstack/react-query';
import { snackMessage } from '@stores/snackMessage';
import { patchUserAiPersona } from '@api/user/patch';

const useAiPersonaChange = () => {
  const [userAiPersona, setUserAiPersona] = useRecoilState(userAiPersonaStatus);
  const [selectedPersonaCode, setSelectedPersonaCode] = useState<string>(userAiPersona.personaCode);
  const setSnackbar = useSetRecoilState(snackMessage);
  const changeAiPersona = useMutation({
    mutationFn: (personaCode: string) =>
      patchUserAiPersona({ personaCode: personaCode, userId: '1' }), // todo: userId 수정
    onSuccess: (data) => {
      console.log(data);
      // todo: 응답 데이터 수정 후 수정
      const name = data === 'T' ? '사고형' : '감정형';
      setUserAiPersona({ personaCode: data, personaName: name });
      setSnackbar(`${name} AI가 편지를 보냅니다`);
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
