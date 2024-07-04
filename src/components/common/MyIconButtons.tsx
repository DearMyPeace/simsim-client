import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// 필요한 아이콘 세트 추가
type IconSet = 'Octicons' | 'MaterialIcons' | 'MaterialCommunityIcons' | 'Feather';

interface IOcticonsButtonProps extends PressableProps {
  name: string;
  iconSet: IconSet;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

type IconMapType = {
  [key in IconSet]: typeof Octicons;
};

const iconMap: IconMapType = {
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
};

const MyIconButton = ({
  onPress,
  iconSet,
  name,
  size = 24,
  color = 'black',
  style,
  disabled,
  ...props
}: IOcticonsButtonProps) => {
  const IconComponent = iconMap[iconSet];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      disabled={disabled}
      {...props}
    >
      <IconComponent name={name} size={size} color={disabled ? '#666666' : color} />
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
