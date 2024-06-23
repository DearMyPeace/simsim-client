import React, { useState } from 'react';
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
import { useSetRecoilState } from 'recoil';
import { snackMessage } from '@stores/snackMessage';
import { set } from 'date-fns';

const DiaryCard = ({ id, createdTime, content, dateStatus }: IDiaryCardProps) => {
  const [diaryInput, setDiaryInput] = useState(id === NEW_DIARY ? '' : content);
  const [isEditing, setIsEditing] = useState(false);
  const [timeStartWriting, setTimeStartWriting] = useState<string>('');
  const setSnackbar = useSetRecoilState(snackMessage);
  const queryClient = useQueryClient();
  const addNewDiary = useMutation({
    mutationFn: (data: IDiaryPostRequest) => postDiary(data),
    onSuccess: (data) => {
      setTimeStartWriting(data.createdDate);
      queryClient.invalidateQueries({ queryKey: ['diaryCounts'] });
      queryClient.invalidateQueries({ queryKey: ['diaryList'] });
      setSnackbar('저장이 완료되었습니다.');
    },
    onError: (error) => {
      setSnackbar(error.message);
    },
    onSettled: () => {
      setIsEditing(false);
      setSnackbar('');
      setDiaryInput('');
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
      setSnackbar(error.message);
    },
    onSettled: () => {
      setIsEditing(false);
      setSnackbar('');
      setDiaryInput('');
    },
  });
  const editDiary = useMutation({
    mutationFn: (data: IDiaryPatchRequest) => patchDiary(data),
    onSuccess: (data) => {
      setTimeStartWriting(data.createdTime);
      queryClient.invalidateQueries({ queryKey: ['diaryCounts'] });
      queryClient.invalidateQueries({ queryKey: ['diaryList'] });
      setSnackbar('수정이 완료되었습니다.');
    },
    onError: (error) => {
      setSnackbar(error.message);
    },
    onSettled: () => {
      console.log('editDiary settled');
      setIsEditing(false);
      setSnackbar('');
      setDiaryInput('');
    },
  });

  const onRemove = () => {
    if (id === NEW_DIARY) return;
    // 편집 취소
    if (isEditing) {
      setIsEditing(false);
      return;
    }
    // 삭제
    removeDiary.mutate(id);
  };

  const onSave = () => {
    console.log('onSave', id, diaryInput);
    console.log('timeStartWriting', timeStartWriting);
    if (diaryInput === '') return;
    const data = {
      userId: 1, // TODO: userId 수정
      content: diaryInput,
      createdDate: timeStartWriting,
      modifiedDate: timeStartWriting,
    };
    console.log('onSave', id, data);
    if (id === NEW_DIARY) {
      addNewDiary.mutate(data);
    } else {
      editDiary.mutate({ id, data });
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
          createdTime={createdTime}
          timeStartWriting={timeStartWriting}
          isEditing={isEditing}
          onRemove={onRemove}
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
          <DiaryContent isEmpty={createdTime === ''} content={content} />
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
    paddingHorizontal: 10,
    ...Platform.select({
      web: {
        width: '90%',
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
    marginHorizontal: 6,
    ...Platform.select({
      web: {
        width: '100%',
        height: '100%',
      },
    }),
  },
});

export default DiaryCard;
