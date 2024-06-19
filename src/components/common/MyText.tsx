import React from 'react';
import { Text, TextProps } from 'react-native';

interface MyTextProps extends TextProps {
  font?: string;
  size?: number;
}

// android 호환성 문제로 fontweight은 사용 불가
const MyText = ({ font = 'Inder-Regular', size = 14, style, ...rest }: MyTextProps) => {
  return <Text style={[{ fontFamily: font, fontSize: size }, style]} {...rest} />;
};

export default MyText;
