import React from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Snackbar } from 'react-native-paper';
import MyText from './MyText';

interface IMySnackbarProps {
  visible: boolean;
  text: string;
  onDissmiss: () => void;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

const MySnackbar = ({ visible, text, onDissmiss, style }: IMySnackbarProps) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDissmiss}
      style={[styles.wrapper, style]}
      duration={2500}
    >
      <MyText style={styles.text}>{text}</MyText>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#6F6F6F',
    backgroundColor: '#B8B8B8',
    opacity: 0.7,
    marginHorizontal: 50,
  },
  text: {
    textAlign: 'center',
  },
});

export default MySnackbar;
