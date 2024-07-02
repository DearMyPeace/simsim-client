import React from 'react';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import { StyleSheet, View } from 'react-native';
import MyModal from '@components/common/MyModal';
import { IBasicModalProps } from '@type/Modal';

const BasicConfirmModal = ({
  visible,
  setIsVisible,
  onConfirm,
  content,
  confirmText = '확인',
}: IBasicModalProps) => {
  const onCancel = () => {
    setIsVisible(false);
  };

  return (
    <MyModal visible={visible} setIsVisible={setIsVisible} transparent={true} animationType="fade">
      <View style={styles.modalContent}>
        <MyText style={{ textAlign: 'center' }}>{content}</MyText>
      </View>
      <View style={styles.modalButtons}>
        <TextButton onPress={onCancel}>취소</TextButton>
        <TextButton onPress={onConfirm}>{confirmText}</TextButton>
      </View>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    width: '75%',
  },
});

export default BasicConfirmModal;