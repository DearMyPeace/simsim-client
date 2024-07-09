import React from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import MyText from '@components/common/MyText';

interface ICenterViewText {
  text: string;
  textSize?: number;
  textStyle?: StyleProp<TextStyle>;
}

const CenterViewText = ({ text, textSize = 14, textStyle }: ICenterViewText) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
      <MyText size={textSize} style={textStyle}>
        {text}
      </MyText>
    </View>
  );
};

export default CenterViewText;
