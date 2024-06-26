import React from 'react';
import { Text, TextProps } from 'react-native';

interface MyTextProps extends TextProps {
  font?: string;
  size?: number;
  bold?: boolean;
}

// android 호환성 문제로 fontweight은 사용 불가
const MyText = ({
  font = 'GowunBatang-Regular',
  size = 14,
  bold = false,
  style,
  ...rest
}: MyTextProps) => {
  const fontFamily = bold ? font.replace('Regular', 'Bold') : font;
  return <Text style={[{ fontFamily, fontSize: size }, style]} {...rest} />;
};

export default MyText;
