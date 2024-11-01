// PsychologicalConsulting.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Pressable } from 'react-native';
import MyText from '@components/common/MyText';
import { fontMedium } from '@utils/Sizing';

export default function PsychologicalConsulting() {
  const handlePress = () => {
    const url = 'https://www.youtube.com/watch?v=buYr87UzJtI&t=488s';
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        {/* <AntDesign name="exclamationcircleo" size={120} color="#D9D9D9" /> */}
        {/* <MyText style={styles.emptyText}>연결된 항목이 없습니다.</MyText> */}
        <Pressable onPress={handlePress}>
          <MyText style={styles.buttonText}>마음의 휴식을 위하여{'\n'}#싱잉볼 유투브</MyText>
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
