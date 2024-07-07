import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
// import { IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
// import MyIconButton from '@components/common/MyIconButtons';
import TextButton from '@components/common/TextButton';
import { useRecoilValue } from 'recoil';
import { tense } from '@stores/tense';

interface DiaryCardHeaderProps {
  isNew: boolean;
  createdTime: string;
  timeStartWriting: string;
  isEditing: boolean;
  isLetterSent: boolean;
  onSave: () => void;
  onClose: () => void;
  onDelete: () => void;
  onSend: () => void;
}

const formatTime = (time: string) => {
  if (!time) return '';
  return format(new Date(time), 'a hh:mm', { locale: ko });
};

const DiaryCardHeader = ({
  isNew,
  createdTime,
  timeStartWriting,
  isEditing,
  isLetterSent,
  onSave,
  onClose,
  onDelete,
  onSend,
}: DiaryCardHeaderProps) => {
  const dateStatus = useRecoilValue(tense);

  return (
    <View style={styles.header}>
      <MyText>{formatTime(createdTime) || formatTime(timeStartWriting)}</MyText>
      <View style={styles.icons}>
        {Platform.OS === 'web' && isEditing && (
          <TextButton
            compact
            onPress={onSave}
            labelStyle={{ textDecorationLine: 'underline', fontSize: 11 }}
          >
            저장
          </TextButton>
          // <MyIconButton
          //   iconSet="AntDesign"
          //   name="save"
          //   size={16}
          //   onPress={onSave}
          //   style={styles.icon}
          // />
        )}
        {!isNew &&
          (isEditing ? (
            <TextButton onPress={onClose} labelStyle={styles.iconLabelStyle}>
              취소
            </TextButton>
          ) : (
            // <IconButton icon="close" size={16} onPress={onClose} style={styles.icon} />
            <>
              {dateStatus !== 'FUTURE' && (
                <TextButton
                  onPress={onSend}
                  labelStyle={styles.iconLabelStyle}
                  disabled={isLetterSent}
                >
                  보내기
                </TextButton>
              )}
              <TextButton onPress={onDelete} labelStyle={styles.iconLabelStyle}>
                삭제
              </TextButton>
              {/* <MyIconButton
                iconSet="Feather"
                name="send"
                size={16}
                onPress={onSend}
                style={styles.icon}
                disabled={isLetterSent}
              /> */}
              {/* <MyIconButton
                iconSet="Feather"
                name="trash-2"
                size={16}
                onPress={onDelete}
                style={styles.icon}
              /> */}
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
    minHeight: 32,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconLabelStyle: {
    textDecorationLine: 'underline',
    fontSize: 11,
  },
  // icon: {
  //   margin: 0,
  // },
});
