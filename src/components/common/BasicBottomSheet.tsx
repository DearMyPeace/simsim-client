import React from 'react';
import { View, StyleSheet, Modal, Pressable, Platform } from 'react-native';

interface IBasicBottomSheetProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onClose?: () => void;
  children: React.ReactNode;
}
const BasicBottomSheet = ({
  visible,
  setVisible,
  onClose = () => {},
  children,
}: IBasicBottomSheetProps) => {
  const onOverlayPress = () => {
    setVisible(false);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onOverlayPress}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.overlay} onPress={onOverlayPress} />
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
