import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Pressable, Keyboard } from 'react-native';
import { DiaryButtonType, IDiaryCardProps, NEW_DIARY } from '@type/Diary';
import { CARD_WIDTH } from '@utils/Sizing';
import DiaryInput from '@components/diary/carousel/DiaryInput';
import DiaryCardHeader from '@components/diary/carousel/DiaryCardHeader';
import { useRecoilValue } from 'recoil';
import { selectedDateStatus } from '@stores/tense';
import BasicConfirmModal from '@components/common/BasicConfirmModal';
import DiaryLoading from '@components/diary/carousel/DiaryLoading';
import { useDiaryActions } from '@hooks/diary/useDiaryActions';

const DiaryCard = ({
  id,
  content,
  createdDate,
  isEditing,
  setIsEditing,
  isLetterSent,
  isSuccess,
}: IDiaryCardProps) => {
  const [diaryInput, setDiaryInput] = useState('');
  const [timeStartWriting, setTimeStartWriting] = useState<string>('');
  const {
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
  } = useDiaryActions({
    setIsEditing,
    setTimeStartWriting,
  });
  const targetDate = useRecoilValue(selectedDateStatus);
  const [loagindButton, setLoadingButton] = useState<DiaryButtonType | ''>('');

  useEffect(() => {
    setDiaryInput(id === NEW_DIARY ? '' : content);
    setIsEditing(false);
    setTimeStartWriting('');
  }, [id, content, targetDate]);

  useEffect(() => {
    if (addNewDiary.isPending || editDiary.isPending) {
      setLoadingButton('SAVE');
    } else if (removeDiary.isPending) {
      setLoadingButton('DELETE');
    } else if (sendDiary.isPending) {
      setLoadingButton('SEND');
    } else {
      setLoadingButton('');
    }
  }, [addNewDiary.isPending, editDiary.isPending, removeDiary.isPending, sendDiary.isPending]);

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
    setIsDeleteModalVisible(false);
    removeDiary.mutate(id);
  };

  const onConfirmEdit = () => {
    setIsEditing(false);
    setDiaryInput(content);
    setEditModalVisible(false);
  };

  const onConfirmSend = () => {
    setSendModalVisible(false);
    sendDiary.mutate({ targetDate });
  };

  const sendDiaryData = () => {
    const data = {
      content: diaryInput,
      createdDate: createdDate || timeStartWriting,
      modifiedDate: timeStartWriting,
    };
    id === NEW_DIARY ? addNewDiary.mutate(data) : editDiary.mutate({ diaryId: id, data });
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
    if (diaryInput === content) {
      setIsEditing(false);
      return;
    }
    sendDiaryData();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          {isSuccess ? (
            <DiaryCardHeader
              isNew={id === NEW_DIARY}
              createdDate={createdDate}
              timeStartWriting={timeStartWriting}
              isEditing={isEditing}
              isLetterSent={isLetterSent}
              loadingButton={loagindButton}
              onClose={onClose}
              onSave={onSave}
              onDelete={onDelete}
              onSend={onSend}
            />
          ) : (
            <View style={{ minHeight: 38 }} />
          )}
          <DiaryInput
            isNew={id === NEW_DIARY}
            diaryInput={diaryInput}
            setDiaryInput={setDiaryInput}
            timeStartWriting={timeStartWriting}
            setTimeStartWriting={setTimeStartWriting}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            placeholder={content}
          />
        </View>
      </View>
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
        content={`이 날의 기록을 모두 보내시겠습니까?\n수정 후 기록을 다시 보내면\n이전 편지는 사라집니다.`}
        confirmText="편지 받기"
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
