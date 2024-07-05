import React from 'react';
import { Platform } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

const TextButton = ({
  children,
  compact = true,
  textColor = 'black',
  labelStyle,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      mode="text"
      compact={compact}
      textColor={textColor}
      labelStyle={[{ fontFamily: 'GowunBatang-Regular', fontWeight: 400 }, labelStyle]}
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
