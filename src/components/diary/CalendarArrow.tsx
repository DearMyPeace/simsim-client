import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';

export type Direction = 'left' | 'right';

interface CalendarArrowProps {
  direction: Direction;
}

const CalendarArrow = ({ direction }: CalendarArrowProps) => {
  return (
    <View style={direction === 'left' && { marginRight: 20 }}>
      <Icon
        source={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        size={24}
        color="#333333"
      />
    </View>
  );
};

export default CalendarArrow;
