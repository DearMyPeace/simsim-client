import React from 'react';
import { Modal, ModalProps, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface IMyModalProps extends ModalProps {
  visible: boolean;
  setIsVisible: (visible: boolean) => void;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const MyModal = ({ visible, setIsVisible, children, containerStyle, ...rest }: IMyModalProps) => {
  const onClose = () => {
    setIsVisible(false);
  };
  return (
    <Modal visible={visible} onRequestClose={onClose} {...rest}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={({ hovered }) => [
            styles.container,
            containerStyle,
            hovered && { cursor: 'default' },
          ]}
          onPress={() => {}}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: 300,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
