import React from 'react';
import { Platform } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

const TextButton = ({ children, textColor = 'black', ...rest }: ButtonProps) => {
  return (
    <Button
      mode="text"
      textColor={textColor}
      labelStyle={{ fontFamily: 'GowunBatang-Regular', fontWeight: 400 }}
      style={{
        borderWidth: 0,
        ...Platform.select({
          web: {
            outlineStyle: 'none',
          },
        }),
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default TextButton;
