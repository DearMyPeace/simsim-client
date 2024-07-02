import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Pressable, Keyboard, TextInput } from 'react-native';
import { IDiaryCardProps, IDiaryPatchRequest, IDiaryPostRequest, NEW_DIARY } from '@type/Diary';
import { CARD_WIDTH } from '@utils/Sizing';
import DiaryInput from '@components/diary/carousel/DiaryInput';
import DiaryContent from '@components/diary/carousel/DiaryContent';
import DiaryCardHeader from '@components/diary/carousel/DiaryCardHeader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postDiary } from '@api/diary/post';
import { deleteDiary } from '@api/diary/delete';
import { patchDiary } from '@api/diary/patch';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { tense } from '@stores/tense';

const DiaryCard = ({ id, createdTime, content, isEditing, setIsEditing }: IDiaryCardProps) => {
  const [diaryInput, setDiaryInput] = useState('');
  const [timeStartWriting, setTimeStartWriting] = useState<string>('');
  const dateStatus = useRecoilValue(tense);
  const setSnackbar = useSetRecoilState(snackMessage);
  const queryClient = useQueryClient();

  useEffect(() => {
    setDiaryInput(id === NEW_DIARY ? '' : content);
    setIsEditing(false);
  }, [id, content]);

  const addNewDiary = useMutation({
    mutationFn: (data: IDiaryPostRequest) => postDiary(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['diaryCounts'] });
      queryClient.invalidateQueries({ queryKey: ['diaryList'] });
      setSnackbar('저장이 완료되었습니다.');
      setTimeStartWriting('');
    },
    onError: (error) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });
  const removeDiary = useMutation({
    mutationFn: (id: number) => deleteDiary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaryCounts'] });
      queryClient.invalidateQueries({ queryKey: ['diaryList'] });
      setSnackbar('삭제가 완료되었습니다.');
    },
    onError: (error) => {
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
      queryClient.invalidateQueries({ queryKey: ['diaryList'] });
      setSnackbar('수정이 완료되었습니다.');
    },
    onError: (error) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const onClose = () => {
    if (id === NEW_DIARY) return;
    if (isEditing) {
      setIsEditing(false);
      setDiaryInput(content);
      setSnackbar('수정이 취소되었습니다.');
      return;
    }
    removeDiary.mutate(id);
  };

  const onSave = () => {
    if (diaryInput === '') {
      setSnackbar('입력된 내용이 없습니다.');
      if (id === NEW_DIARY) {
        setTimeStartWriting('');
        setIsEditing(false);
      }
      return;
    }
    const cretatedDate = id === NEW_DIARY ? timeStartWriting : createdTime;
    const data = {
      content: diaryInput,
      createdDate: cretatedDate,
      modifiedDate: cretatedDate,
    };
    if (id === NEW_DIARY) {
      addNewDiary.mutate(data);
    } else {
      editDiary.mutate({ diaryId: id, data });
    }
  };

  const onKeyboardDismiss = () => {
    setIsEditing(false);
    Keyboard.dismiss();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={onKeyboardDismiss}
      disabled={Platform.OS === 'web'}
    >
      <View style={styles.card}>
        <DiaryCardHeader
          isNew={id === NEW_DIARY}
          createdTime={id !== NEW_DIARY ? createdTime : ''}
          timeStartWriting={timeStartWriting}
          isEditing={isEditing}
          onClose={onClose}
          onSave={onSave}
        />
        {dateStatus === 'TODAY' ? (
          <DiaryInput
            id={id}
            isNew={id === NEW_DIARY}
            diaryInput={diaryInput}
            setDiaryInput={setDiaryInput}
            timeStartWriting={timeStartWriting}
            setTimeStartWriting={setTimeStartWriting}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            placeholder={content}
          />
        ) : (
          <DiaryContent
            isEmpty={createdTime === ''}
            content={content || '작성된 일기가 없습니다'}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        width: '100%',
        height: '100%',
      },
    }),
  },
  card: {
    width: '100%',
    height: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F1E2CC',
    borderRadius: 12,
  },
});

export default DiaryCard;
