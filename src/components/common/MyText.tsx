import React from 'react';
import { Text, TextProps } from 'react-native';

interface MyTextProps extends TextProps {
  font?: string;
  size?: number;
}

const MyText = ({ font = 'Inder-Regular', size = 14, style, ...rest }: MyTextProps) => {
  return (
    <Text style={[{ fontFamily: font, fontSize: size }, style]} {...rest}>
      My Text
    </Text>
  );
};

export default MyText;
