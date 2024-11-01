import React from 'react';
import { View } from 'react-native';
import Left from '@assets/svg/icons/entypo--chevron-small-left.svg';
import Right from '@assets/svg/icons/entypo--chevron-small-right.svg';

export type Direction = 'left' | 'right';

interface CalendarArrowProps {
  direction: Direction;
}

const CalendarArrow = ({ direction }: CalendarArrowProps) => {
  return (
    <View style={direction === 'left' && { marginRight: 20 }}>
      {direction === 'left' ? (
        <Left width={24} height={24} fill="#333333" />
      ) : (
        <Right width={24} height={24} fill="#333333" />
      )}
    </View>
  );
};

export default CalendarArrow;
