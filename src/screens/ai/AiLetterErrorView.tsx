import React from 'react';
import { StyleSheet, View } from 'react-native';

import MyText from '@components/common/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fontMedium } from '@utils/Sizing';

const AiLetterErrorView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <AntDesign name="exclamationcircleo" size={120} color="#ccc" />
        <MyText style={styles.emptyText}>편지를 표시할 수 없어요.</MyText>
      </View>
    </View>
  );
};

export default AiLetterErrorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: fontMedium,
    color: 'gray',
  },
});