import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MyText from '@components/common/MyText';

const DiaryContent = ({ content, isEmpty }: { content: string; isEmpty: boolean }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={[styles.content, isEmpty && styles.empty]}>
        <MyText>{content}</MyText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryContent;
