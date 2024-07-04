import React from 'react';
import { StyleSheet, View } from 'react-native';

import MyText from '@components/common/MyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontMedium } from '@utils/Sizing';

const AiLetterEmptyView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Ionicons name="mail-open-outline" size={120} color="#ccc" />
        <MyText style={styles.emptyText}>받은 편지가 없어요.</MyText>
      </View>
    </View>
  );
};

export default AiLetterEmptyView;

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