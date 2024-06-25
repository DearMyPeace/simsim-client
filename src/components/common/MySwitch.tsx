import React from 'react';
import { Switch, Platform, SwitchProps } from 'react-native';

const MySwitch = ({ value, onValueChange, ...rest }: SwitchProps) => {
  return (
    <Switch
      trackColor={{ false: Platform.OS === 'ios' ? 'white' : '#f1e2cc', true: '#c99a3c' }}
      thumbColor={value ? 'white' : '#c99a3c'}
      ios_backgroundColor="#ffffff" // ios disabled일 때 찾아보기
      onValueChange={onValueChange}
      value={value}
      style={{
        transform: [
          { scaleX: Platform.OS === 'ios' ? 1 : 1.2 },
          { scaleY: Platform.OS === 'ios' ? 1 : 1.2 },
        ],
      }}
      {...rest}
    />
  );
};

export default MySwitch;
