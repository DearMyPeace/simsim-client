// src/components/CustomLoadingControlWrapper.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomRefreshControl from '@screens/common/CustomRefreshControl';

const CustomLoadingControlWrapper: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomRefreshControl />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default CustomLoadingControlWrapper;
