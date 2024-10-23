import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Left from '@assets/svg/icons/entypo--chevron-thin-left.svg';
import Right from '@assets/svg/icons/entypo--chevron-thin-right.svg';

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
      {direction === 'left' ? (
        <Left width={24} height={24} fill="#666666" />
      ) : (
        <Right width={24} height={24} fill="#666666" />
      )}
    </Pressable>
  );
};

export default DiaryArrowIcons;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    zIndex: 1,
  },
  leftIcon: {
    left: 0,
  },
  rightIcon: {
    right: 0,
  },
});
