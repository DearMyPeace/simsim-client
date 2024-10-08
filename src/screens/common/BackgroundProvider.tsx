import React from 'react';
import { Platform, StyleSheet, ImageBackground } from 'react-native';

const BackgroundProvider = ({ children }) => {
  if (Platform.OS === 'web') {
    return <>{children}</>;
  }
  return (
    <ImageBackground
      source={require('@assets/images/background.jpg')}
      style={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
export default BackgroundProvider;
