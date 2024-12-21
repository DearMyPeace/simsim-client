import React, { ReactNode } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';

interface IMyPressableProps extends PressableProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}

function MyPressable({ children, containerStyle, ...pressableProps }: IMyPressableProps) {
  return (
    <Pressable
      {...pressableProps}
      style={(state) => [
        state.pressed && { opacity: 0.5 },
        state.hovered && { backgroundColor: 'rgba(31, 27, 21, 0.06)' },
        !pressableProps.onPress && { cursor: 'default' },
        containerStyle,
      ]}
    >
      {children}
    </Pressable>
  );
}

export default MyPressable;
