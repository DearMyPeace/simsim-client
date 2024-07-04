import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Pressable, Keyboard } from 'react-native';
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
import { selectedDateStatus, tense } from '@stores/tense';
import BasicConfirmModal from '@components/common/BasicConfirmModal';
import { postAiLetters } from '@api/ai/post';
import { IAiLetterRequest } from '@type/IAiLetterRequest';
import DiaryLoading from '@components/diary/carousel/DiaryLoading';

const DiaryCard = ({
  id,
  createdTime,
  content,
  isEditing,
  setIsEditing,
  isLetterSent,
}: IDiaryCardProps) => {
  const [diaryInput, setDiaryInput] = useState('');
  const [timeStartWriting, setTimeStartWriting] = useState<string>('');
  const dateStatus = useRecoilValue(tense);
  const setSnackbar = useSetRecoilState(snackMessage);
  const queryClient = useQueryClient();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSendModalVisible, setSendModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const targetDate = useRecoilValue(selectedDateStatus);

  useEffect(() => {
    setDiaryInput(id === NEW_DIARY ? '' : content);
    setIsEditing(false);
  }, [id, content]);

  const addNewDiary = useMutation({
    mutationFn: (data: IDiaryPostRequest) => postDiary(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['diary'] });
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
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      setSnackbar('삭제가 완료되었습니다.');
    },
    onError: (error) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsEditing(false);
      setDiaryInput('');
      setIsDeleteModalVisible(false);
    },
  });
  const editDiary = useMutation({
    mutationFn: (data: IDiaryPatchRequest) => patchDiary(data),
    onSuccess: (data) => {
      setTimeStartWriting(data.createdDate);
      queryClient.invalidateQueries({ queryKey: ['diary', 'list'] });
      setSnackbar('수정이 완료되었습니다.');
    },
    onError: (error) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const sendDiary = useMutation({
    mutationFn: (data: IAiLetterRequest) => postAiLetters(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['diary', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      // setSnackbar('편지가 도착했습니다');
    },
    onError: (error) => {
      setSnackbar(error.response.data.message || '오류가 발생했습니다.');
    },
    onSettled: () => {
      setSendModalVisible(false);
    },
  });

  const onClose = () => {
    // 변경된 내용이 없을 땐 모달 띄우지 않음
    diaryInput === content ? setIsEditing(false) : setEditModalVisible(true);
  };

  const onSend = () => {
    setSendModalVisible(true);
  };

  const onDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const onConfirmDelete = () => {
    removeDiary.mutate(id);
  };

  const onConfirmEdit = () => {
    setIsEditing(false);
    setDiaryInput(content);
    setSnackbar('수정이 취소되었습니다.');
    setEditModalVisible(false);
  };

  const onConfirmSend = () => {
    sendDiary.mutate({ targetDate });
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
    <>
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
            isLetterSent={isLetterSent}
            onClose={onClose}
            onSave={onSave}
            onDelete={onDelete}
            onSend={onSend}
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
      <BasicConfirmModal
        visible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
        onConfirm={onConfirmDelete}
        content="심심기록을 삭제하시겠습니까?"
      />
      <BasicConfirmModal
        visible={isEditModalVisible}
        setIsVisible={setEditModalVisible}
        onConfirm={onConfirmEdit}
        content="수정을 취소하시겠습니까?"
      />
      <BasicConfirmModal
        visible={isSendModalVisible}
        setIsVisible={setSendModalVisible}
        onConfirm={onConfirmSend}
        content="기록을 보내시겠습니까?"
        confirmText="보내기"
      />
      {sendDiary.isPending && <DiaryLoading />}
    </>
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
