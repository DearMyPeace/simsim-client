// src/components/CustomRefreshControlWrapper.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomRefreshControl from '@screens/common/CustomRefreshControl';

const CustomRefreshControlWrapper: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomRefreshControl />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -80,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default CustomRefreshControlWrapper;
