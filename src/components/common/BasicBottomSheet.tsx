import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { overlay } from 'react-native-paper';

interface IBasicBottomSheetProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
}
const BasicBottomSheet = ({ visible, setVisible, children }: IBasicBottomSheetProps) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.overlay} onPress={onClose} />
          <View style={styles.modalContent}>{children}</View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default BasicBottomSheet;
