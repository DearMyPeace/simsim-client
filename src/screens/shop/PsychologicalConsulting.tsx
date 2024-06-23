// PsychologicalConsulting.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '@components/common/MyText';

export default function PsychologicalConsulting() {
  return (
    <View style={styles.container}>
      <MyText>심리상담 페이지</MyText>
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
