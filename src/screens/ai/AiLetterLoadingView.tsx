import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MyText from '@components/common/MyText';
import { fontLarge } from '@utils/Sizing';

const AiLetterLoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
      <MyText style={styles.text}> 편지를 가져오고 있어요. </MyText>
    </View>
  );
};

export default AiLetterLoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: fontLarge,
  },
});
