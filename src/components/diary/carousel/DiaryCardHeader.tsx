import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MyText from '@components/common/MyText';
import { IconButton } from 'react-native-paper';

interface DiaryCardHeaderProps {
  createdTime: string;
  isEditing: boolean;
  onSave: () => void;
  onRemove: () => void;
}

const DiaryCardHeader = ({ createdTime, isEditing, onSave, onRemove }: DiaryCardHeaderProps) => {
  return (
    <View style={styles.header}>
      <MyText>{createdTime}</MyText>
      <View style={styles.icons}>
        {Platform.OS === 'web' && isEditing && (
          <IconButton icon="check" size={16} onPress={onSave} style={styles.icon} />
        )}
        <IconButton icon="close" size={16} onPress={onRemove} style={styles.icon} />
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
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    margin: 0,
  },
});
