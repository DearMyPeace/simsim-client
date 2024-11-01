import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  IDiariesResponse,
  IDiaryListResponse,
  IDiaryPatchRequest,
  IDiaryPostRequest,
} from '@type/Diary';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postDiary } from '@api/diary/post';
import { deleteDiary } from '@api/diary/delete';
import { patchDiary } from '@api/diary/patch';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { postAiLetters } from '@api/ai/post';
import { IAiLetterRequest } from '@type/IAiLetterRequest';
import { selectedDateStatus } from '@stores/tense';

interface IUseDiaryActionsProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setTimeStartWriting: Dispatch<SetStateAction<string>>;
}

export const useDiaryActions = ({ setIsEditing, setTimeStartWriting }: IUseDiaryActionsProps) => {
  const setSnackbar = useSetRecoilState(snackMessage);
  const targetDate = useRecoilValue(selectedDateStatus);
  const queryClient = useQueryClient();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSendModalVisible, setSendModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const addNewDiary = useMutation({
    mutationFn: (data: IDiaryPostRequest) => postDiary(data),
    onSuccess: (data: IDiariesResponse) => {
      queryClient.setQueryData(['diary', 'list', targetDate], (prev: IDiaryListResponse) => {
        return {
          sendStatus: false,
          diaries: [...prev.diaries, data],
        };
      });
      queryClient.invalidateQueries({ queryKey: ['diary', 'counts'] });
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
    onSuccess: (_, diaryId) => {
      queryClient.setQueryData(['diary', 'list', targetDate], (prev: IDiaryListResponse) => {
        return {
          sendStatus: false,
          diaries: prev.diaries.filter((item: IDiariesResponse) => item.diaryId !== diaryId),
        };
      });
      queryClient.invalidateQueries({ queryKey: ['diary', 'counts'] });
      setSnackbar('삭제가 완료되었습니다.');
    },
    onError: (error: any) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });
  const editDiary = useMutation({
    mutationFn: (data: IDiaryPatchRequest) => patchDiary(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['diary', 'list', targetDate], (prev: IDiaryListResponse) => {
        return {
          sendStatus: false,
          diaries: prev.diaries.map((diary: IDiariesResponse) =>
            diary.diaryId === data.diaryId ? data : diary,
          ),
        };
      });
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
    onSuccess: () => {
      queryClient.setQueryData(['diary', 'list', targetDate], (prev: IDiaryListResponse) => {
        return {
          ...prev,
          sendStatus: true,
        };
      });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      queryClient.invalidateQueries({ queryKey: ['fetchAiLettersMonthSummary'] });
      queryClient.invalidateQueries({ queryKey: ['fetchAiLetterByID'] });
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
    setSnackbar,
    addNewDiary,
    removeDiary,
    editDiary,
    sendDiary,
  };
};
