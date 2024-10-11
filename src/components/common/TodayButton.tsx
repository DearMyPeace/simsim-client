import React from 'react';
import {
  GestureResponderHandlers,
  Pressable,
  Animated as RNAnimated,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import MyText from '@components/common/MyText';
import { appColor3 } from '@utils/colors';

interface ITodayButtonProps {
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  handler?: GestureResponderHandlers;
}

const TodayButton = ({ onPress, buttonStyle, handler }: ITodayButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <RNAnimated.View {...handler} style={[styles.todayButton, buttonStyle]}>
        <MyText style={styles.todayButtonText}>오늘</MyText>
      </RNAnimated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.5,
  },
  todayButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: appColor3,
    borderWidth: 1,
  },
  todayButtonText: {
    color: appColor3,
    userSelect: 'none',
    fontFamily: 'GowunBatang-Bold',
  },
});

export default TodayButton;
