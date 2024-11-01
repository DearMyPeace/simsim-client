import React, { ReactElement } from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import SettingIcon from '@assets/svg/icons/ion--ellipsis-horizontal-outline.svg';
import CloseIcon from '@assets/svg/icons/material-symbols--close-small-outline.svg';

// 필요한 Icon import 후 IconSet에 추가
type IconSet = 'setting' | 'close';

interface IMyIconButtonProps extends PressableProps {
  // icon: ReactElement;
  name: IconSet;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const MyIconButton = ({
  onPress,
  name,
  size = 24,
  color = 'black',
  style,
  disabled,
  ...props
}: IMyIconButtonProps) => {
  const iconSet = {
    setting: <SettingIcon width={size} height={size} fill={color} />,
    close: <CloseIcon width={size} height={size} fill={color} />,
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      disabled={disabled}
      {...props}
    >
      {iconSet[name]}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default MyIconButton;
