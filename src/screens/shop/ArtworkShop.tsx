// ArtworkStore.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '@components/common/MyText';

export default function ArtworkShop() {
  return (
    <View style={styles.container}>
      <MyText>작품상점 페이지</MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
