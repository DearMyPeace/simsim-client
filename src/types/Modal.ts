import React from 'react';
import { ModalProps, StyleProp, ViewStyle } from 'react-native';

export interface IMyModalProps extends ModalProps {
  visible: boolean;
  setIsVisible: (visible: boolean) => void;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface IBasicModalProps {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  content?: string;
  confirmText?: string;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}
