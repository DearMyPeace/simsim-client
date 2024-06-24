import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'react-native-paper';

interface ITextButtonProps extends ButtonProps {
  label: string;
  children: ReactNode;
}

const TextButton = ({ label, children, ...rest }: ITextButtonProps) => {
  return (
    <Button
      mode="text"
      textColor="black"
      labelStyle={{ fontFamily: 'GowunBatang-Regular' }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default TextButton;
