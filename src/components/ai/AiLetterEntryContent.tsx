import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import { fontBasic } from '@utils/Sizing';
import Markdown from 'react-native-markdown-display';

interface AiLetterEntryContentProps {
  section: IAiLetterEntry;
}

const AiLetterEntryContent: React.FC<AiLetterEntryContentProps> = ({ section }) => {
  return (
    <View style={styles.content}>
      <Markdown style={styles.contentText}>{section.content}</Markdown>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F1E2CC',
  },
  contentText: {
    body: {
      fontSize: fontBasic,
      fontFamily: 'GowunBatang-Regular',
    },
    heading2: {
      fontSize: 24,
      fontFamily: 'GowunBatang-Bold',
      marginTop: 10,
    },
    heading3: {
      marginTop: 10,
    },
  },
});

export default AiLetterEntryContent;
