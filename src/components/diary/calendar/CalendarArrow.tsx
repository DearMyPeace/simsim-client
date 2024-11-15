import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Left from '@assets/svg/icons/entypo--chevron-small-left.svg';
import Right from '@assets/svg/icons/entypo--chevron-small-right.svg';

export type Direction = 'left' | 'right';

interface CalendarArrowProps {
  direction: Direction;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const CalendarArrow = ({
  direction,
  size = 24,
  style = { marginRight: 20 },
}: CalendarArrowProps) => {
  return (
    <View style={direction === 'left' && style}>
      {direction === 'left' ? (
        <Left width={size} height={size} fill="#333333" />
      ) : (
        <Right width={size} height={size} fill="#333333" />
      )}
    </View>
  );
};

export default CalendarArrow;
