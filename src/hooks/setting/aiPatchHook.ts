import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAiPersonaStatus } from '@stores/userAiPersona';
import { useMutation } from '@tanstack/react-query';
import { snackMessage } from '@stores/snackMessage';

// todo: api 요청
const patchAiPersona = (newPersona: string) => {
  console.log(`changed ai persona to ${newPersona}`);
};

const useAiPersonaChange = () => {
  const [userAiPersona, setUserAiPersona] = useRecoilState(userAiPersonaStatus);
  const [selectedValue, setSelectedValue] = useState(userAiPersona);
  const setSnackbar = useSetRecoilState(snackMessage);
  const changeAiPersona = useMutation({
    mutationFn: (data: string) => patchAiPersona(data),
    onSuccess: () => {
      setUserAiPersona(selectedValue);
      setSnackbar(`${selectedValue} AI가 편지를 보냅니다`);
    },
    onError: (error) => {
      setSnackbar(error.response.data.message);
    },
  });

  return {
    userAiPersona,
    setUserAiPersona,
    selectedValue,
    setSelectedValue,
    setSnackbar,
    changeAiPersona,
  };
};

export default useAiPersonaChange;
