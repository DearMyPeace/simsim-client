import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';

const TextButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      mode="text"
      textColor="black"
      labelStyle={{ fontFamily: 'GowunBatang-Regular', fontWeight: 400 }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default TextButton;
