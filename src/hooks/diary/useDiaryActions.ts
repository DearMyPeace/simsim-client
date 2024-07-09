import React, { Dispatch, SetStateAction, useState } from 'react';
import { IDiaryPatchRequest, IDiaryPostRequest } from '@type/Diary';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postDiary } from '@api/diary/post';
import { deleteDiary } from '@api/diary/delete';
import { patchDiary } from '@api/diary/patch';
import { useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { postAiLetters } from '@api/ai/post';
import { IAiLetterRequest } from '@type/IAiLetterRequest';

interface IUseDiaryActionsProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setDiaryInput: Dispatch<SetStateAction<string>>;
  setTimeStartWriting: Dispatch<SetStateAction<string>>;
}

export const useDiaryActions = ({
  setIsEditing,
  setDiaryInput,
  setTimeStartWriting,
}: IUseDiaryActionsProps) => {
  const setSnackbar = useSetRecoilState(snackMessage);
  const queryClient = useQueryClient();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSendModalVisible, setSendModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isInformModalVisible, setInformModalVisible] = useState(false);

  const addNewDiary = useMutation({
    mutationFn: (data: IDiaryPostRequest) => postDiary(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      setSnackbar('저장이 완료되었습니다.');
      setTimeStartWriting('');
    },
    onError: (error: any) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });
  const removeDiary = useMutation({
    mutationFn: (diaryId: number) => deleteDiary(diaryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      setSnackbar('삭제가 완료되었습니다.');
    },
    onError: (error: any) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsEditing(false);
      setDiaryInput('');
    },
  });
  const editDiary = useMutation({
    mutationFn: (data: IDiaryPatchRequest) => patchDiary(data),
    onSuccess: (data) => {
      setTimeStartWriting(data.createdDate);
      queryClient.invalidateQueries({ queryKey: ['diary', 'list'] });
      setSnackbar('수정이 완료되었습니다.');
    },
    onError: (error: any) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const sendDiary = useMutation({
    mutationFn: (data: IAiLetterRequest) => postAiLetters(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['diary', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      queryClient.invalidateQueries({ queryKey: ['fetchAiLettersMonthSummary'] });
    },
    onError: (error: any) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
  });

  return {
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    isSendModalVisible,
    setSendModalVisible,
    isEditModalVisible,
    setEditModalVisible,
    isInformModalVisible,
    setInformModalVisible,
    setSnackbar,
    addNewDiary,
    removeDiary,
    editDiary,
    sendDiary,
  };
};
