import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IAiLetterEntry } from '@type/IAiLetterEntry';
import MyText from '@components/common/MyText';

interface AiLetterEntryContentProps {
  section: IAiLetterEntry;
}

const AiLetterEntryContent: React.FC<AiLetterEntryContentProps> = ({ section }) => {
  return (
    <View style={styles.content}>
      <MyText style={styles.contentText}>{section.content}</MyText>
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
    color: 'black',
    fontSize: 14,
  },
});

export default AiLetterEntryContent;
