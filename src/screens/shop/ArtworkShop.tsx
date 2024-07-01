// ArtworkStore.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '@components/common/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fontMedium } from '@utils/Sizing';

export default function ArtworkShop() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <AntDesign name="exclamationcircleo" size={120} color="#D9D9D9" />
        <MyText style={styles.emptyText}>작품 항목이 없습니다.</MyText>
      </View>
    </View>
  );
}

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
