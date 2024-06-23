import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
import { IconButton } from 'react-native-paper';
import { DateStatus } from '@type/Diary';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DiaryCardHeaderProps {
  isNew: boolean;
  createdTime: string;
  timeStartWriting: string;
  isEditing: boolean;
  onSave: () => void;
  onRemove: () => void;
}

const DiaryCardHeader = ({
  isNew,
  createdTime,
  timeStartWriting,
  isEditing,
  onSave,
  onRemove,
}: DiaryCardHeaderProps) => {
  return (
    <View style={styles.header}>
      <MyText>
        {createdTime || (timeStartWriting && format(timeStartWriting, 'a hh:mm', { locale: ko }))}
      </MyText>
      <View style={styles.icons}>
        {Platform.OS === 'web' && isEditing && (
          <IconButton icon="check" size={16} onPress={onSave} style={styles.icon} />
        )}
        {!isNew && <IconButton icon="close" size={16} onPress={onRemove} style={styles.icon} />}
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
  icon: {
    margin: 0,
  },
});
