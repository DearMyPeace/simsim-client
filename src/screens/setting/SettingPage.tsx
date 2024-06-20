import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const SettingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the Setting screen.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default SettingPage;
