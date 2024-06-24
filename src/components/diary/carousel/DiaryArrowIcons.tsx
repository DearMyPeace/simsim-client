import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

interface DiaryArrowIconsProps {
  direction: 'left' | 'right';
  onPress: () => void;
}

const DiaryArrowIcons = ({ direction, onPress }: DiaryArrowIconsProps) => {
  const iconStyle = direction === 'left' ? styles.leftIcon : styles.rightIcon;

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.3 : 0.7 }, styles.icon, iconStyle]}
      onPress={onPress}
    >
      <Entypo name={`chevron-thin-${direction}`} size={24} color="#666666" />
    </Pressable>
  );
};

export default DiaryArrowIcons;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
  },
  leftIcon: {
    left: 5,
  },
  rightIcon: {
    right: 5,
  },
});
