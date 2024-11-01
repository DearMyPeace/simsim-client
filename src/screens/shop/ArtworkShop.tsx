// ArtworkStore.js
import React from 'react';
import { View, StyleSheet, Linking, Pressable } from 'react-native';
import MyText from '@components/common/MyText';
import { fontMedium } from '@utils/Sizing';

export default function ArtworkShop() {
  const handlePress = () => {
    const url = 'https://www.instagram.com/sim.plepleasure/';
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        {/* <AntDesign name="exclamationcircleo" size={120} color="#D9D9D9" /> */}
        {/* <MyText style={styles.emptyText}>작품 항목이 없습니다.</MyText> */}
        <Pressable onPress={handlePress}>
          <MyText style={styles.buttonText}>따뜻한 글, 따뜻한 그림{'\n'}@클로이 인스타</MyText>
        </Pressable>
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
  buttonText: {
    fontSize: fontMedium,
    color: 'gray',
    textAlign: 'center',
  },
});
