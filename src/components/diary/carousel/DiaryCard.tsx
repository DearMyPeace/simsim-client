import React, { useEffect, useState } from 'react';
import MyText from '@components/common/MyText';
import { View, StyleSheet, Platform, Pressable, Keyboard } from 'react-native';
import { IconButton } from 'react-native-paper';
import { IDiaryCardProps } from '@type/Diary';
import { CARD_WIDTH } from '@utils/Sizing';
import DiaryInput from '@components/diary/carousel/DiaryInput';

const DiaryCard = ({ createdTime, content, dateStatus }: IDiaryCardProps) => {
  const [diaryInput, setDiaryInput] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  // 편집 버튼 없이 텍스트 박스 클릭 시 편집
  // 편집 하는 중에는 웹에서 저장 버튼 띄워주기
  const onRemove = () => {
    console.log('삭제');
  };

  useEffect(() => {
    console.log('dateStatuㅁㅇㄹㅁㄴ', dateStatus);
  }, [dateStatus]);

  useEffect(() => {
    console.log('card', dateStatus);
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
        {/* 시간 */}
        <View style={styles.header}>
          <MyText>{createdTime}</MyText>
          {/* 아이콘 */}
          <View style={styles.icons}>
            {Platform.OS === 'web' && isEditing && (
              <IconButton
                icon="check"
                size={16}
                onPress={() => setIsEditing(false)}
                style={styles.icon}
              />
            )}
            <IconButton icon="close" size={16} onPress={onRemove} style={styles.icon} />
          </View>
        </View>
        {/* 다이어리 */}
        <DiaryInput content={diaryInput} dateStatus={dateStatus} setIsEditing={setIsEditing} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    margin: 0,
  },
});

export default DiaryCard;
