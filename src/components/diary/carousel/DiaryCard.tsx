import React, { useRef, useState } from 'react';
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

const DiaryCard = ({ id, createdTime, content, dateStatus }: IDiaryCardProps) => {
  const [diaryInput, setDiaryInput] = useState(id === NEW_DIARY ? '' : content);
  const [isEditing, setIsEditing] = useState(false);
  const [timeStartWriting, setTimeStartWriting] = useState<string>('');
  const diaryInputRef = useRef<TextInput>(null);
  const queryClient = useQueryClient();
  const addNewDiary = useMutation({
    mutationFn: (data: IDiaryPostRequest) => postDiary(data),
    onSuccess: () => {
      console.log('postDiary success');
      // 스낵바 전역 설정
      setTimeStartWriting('');
      queryClient.invalidateQueries({ queryKey: ['diaryCounts'] });
      queryClient.invalidateQueries({ queryKey: ['diaryList'] });
    },
    onError: (error) => {
      console.log('postDiary error', error);
      // 스낵바 전역 설정
    },
    onSettled: () => {
      console.log('postDiary settled');
      setIsEditing(false);
    },
  });
  const removeDiary = useMutation({
    mutationFn: (id: number) => deleteDiary(id),
    onSuccess: () => {
      console.log('deleteDiary success');
      queryClient.invalidateQueries({ queryKey: ['diaryCounts'] });
      queryClient.invalidateQueries({ queryKey: ['diaryList'] });
      // 스낵바 전역 설정
    },
    onError: (error) => {
      console.log('deleteDiary error', error);
      // 스낵바 전역 설정
    },
    onSettled: () => {
      console.log('deleteDiary settled');
    },
  });
  const editDiary = useMutation({
    mutationFn: (data: IDiaryPatchRequest) => patchDiary(data),
    onSuccess: () => {
      console.log('editDiary success');
      queryClient.invalidateQueries({ queryKey: ['diaryCounts'] });
      queryClient.invalidateQueries({ queryKey: ['diaryList'] });
      // 스낵바 전역 설정
    },
    onError: (error) => {
      console.log('editDiary error', error);
      // 스낵바 전역 설정
    },
    onSettled: () => {
      console.log('editDiary settled');
      setIsEditing(false);
    },
  });

  const onRemove = () => {
    // isEditing
    if (id === NEW_DIARY) return;
    console.log('onRemove', id);
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
    diaryInputRef.current?.blur();
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
            diaryInputRef={diaryInputRef}
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
