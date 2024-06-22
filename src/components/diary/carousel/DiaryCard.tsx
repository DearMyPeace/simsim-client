import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Pressable, Keyboard } from 'react-native';
import { IDiaryCardProps } from '@type/Diary';
import { CARD_WIDTH } from '@utils/Sizing';
import DiaryInput from '@components/diary/carousel/DiaryInput';
import DiaryContent from '@components/diary/carousel/DiaryContent';
import DiaryCardHeader from '@components/diary/carousel/DiaryCardHeader';

const DiaryCard = ({ createdTime, content, dateStatus }: IDiaryCardProps) => {
  const [diaryInput, setDiaryInput] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  // 편집 버튼 없이 텍스트 박스 클릭 시 편집
  // 편집 하는 중에는 웹에서 저장 버튼 띄워주기
  const onRemove = () => {
    console.log('삭제');
  };

  const onSave = () => {
    console.log('저장');
  };

  useEffect(() => {
    setDiaryInput(content);
  }, [content, dateStatus]);

  const onChangeText = (text: string) => {
    if (text.length > 200) return;
    setDiaryInput(text);
  };

  const onKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={onKeyboardDismiss}
      disabled={Platform.OS === 'web'}
    >
      <View style={styles.card}>
        {createdTime !== '' && (
          <DiaryCardHeader
            createdTime={createdTime}
            isEditing={isEditing}
            onRemove={onRemove}
            onSave={onSave}
          />
        )}
        {dateStatus === 'TODAY' ? (
          <DiaryInput
            isNew={createdTime === ''}
            content={diaryInput}
            dateStatus={dateStatus}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
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
