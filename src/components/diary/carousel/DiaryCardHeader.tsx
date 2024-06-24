import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
import { IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import MyIconButton from '@components/common/MyIconButtons';

interface DiaryCardHeaderProps {
  isNew: boolean;
  createdTime: string;
  timeStartWriting: string;
  isEditing: boolean;
  onSave: () => void;
  onClose: () => void;
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
  onSave,
  onClose,
}: DiaryCardHeaderProps) => {
  return (
    <View style={styles.header}>
      <MyText>{formatTime(createdTime) || formatTime(timeStartWriting)}</MyText>
      <View style={styles.icons}>
        {Platform.OS === 'web' && isEditing && (
          <IconButton icon="check" size={16} onPress={onSave} style={styles.icon} />
        )}
        {!isNew &&
          (isEditing ? (
            <IconButton icon="close" size={16} onPress={onClose} style={styles.icon} />
          ) : (
            <MyIconButton
              iconSet="Feather"
              name="trash-2"
              size={16}
              onPress={onClose}
              style={styles.icon}
            />
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
  icon: {
    margin: 0,
  },
});
