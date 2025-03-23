import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
import { format } from 'date-fns';
import TextButton from '@components/common/TextButton';
import { useRecoilValue } from 'recoil';
import { tense } from '@stores/tense';
import { DiaryButtonType } from '@type/Diary';
import { formatTimeToKorean } from '@utils/dateUtils';

interface DiaryCardHeaderProps {
  isNew: boolean;
  createdDate: string;
  timeStartWriting: string;
  isEditing: boolean;
  isLetterSent: boolean;
  loadingButton: DiaryButtonType | '';
  onSave: () => void;
  onClose: () => void;
  onDelete: () => void;
  onSend: () => void;
}

const formatTime = (time: string) => {
  if (!time) return '';
  return formatTimeToKorean(format(new Date(time), 'a hh:mm'));
};

const DiaryCardHeader = ({
  isNew,
  createdDate,
  timeStartWriting,
  isEditing,
  isLetterSent,
  loadingButton,
  onSave,
  onClose,
  onDelete,
  onSend,
}: DiaryCardHeaderProps) => {
  const dateStatus = useRecoilValue(tense);

  return (
    <View style={styles.header}>
      <MyText size={15}>{formatTime(createdDate) || formatTime(timeStartWriting)}</MyText>
      <View style={styles.icons}>
        {isEditing && (
          <TextButton
            compact
            onPress={onSave}
            labelStyle={styles.iconLabelStyle}
            loading={loadingButton === 'SAVE'}
          >
            저장
          </TextButton>
        )}
        {!isNew &&
          (isEditing ? (
            <TextButton onPress={onClose} labelStyle={styles.iconLabelStyle}>
              취소
            </TextButton>
          ) : (
            <>
              {dateStatus !== 'FUTURE' && (
                <TextButton
                  onPress={onSend}
                  labelStyle={styles.iconLabelStyle}
                  disabled={isLetterSent}
                  loading={loadingButton === 'SEND'}
                >
                  편지 받기
                </TextButton>
              )}
              <TextButton
                onPress={onDelete}
                labelStyle={styles.iconLabelStyle}
                loading={loadingButton === 'DELETE'}
              >
                삭제
              </TextButton>
            </>
          ))}
      </View>
    </View>
  );
};

export default DiaryCardHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 38,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconLabelStyle: {
    textDecorationLine: 'underline',
    fontSize: 13,
  },
});
