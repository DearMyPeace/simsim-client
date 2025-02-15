import { fontBasic } from '@utils/Sizing';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface IMarkDownViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  children: string;
}

const MarkDownView = ({ containerStyle, children }: IMarkDownViewProps) => {
  const markdownStyle = StyleSheet.create({
    body: {
      fontSize: fontBasic,
      fontFamily: 'GowunBatang-Regular',
      color: 'black',
    },
    heading2: {
      fontSize: 24,
      fontFamily: 'GowunBatang-Bold',
      marginTop: 10,
    },
    heading3: {
      marginTop: 10,
      fontFamily: 'GowunBatang-Bold',
    },
    strong: {
      fontFamily: 'GowunBatang-Bold',
    },
  });

  return (
    <ScrollView style={containerStyle}>
      <Markdown style={markdownStyle}>{children}</Markdown>
    </ScrollView>
  );
};

export default MarkDownView;
