// src/components/Logo.js

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import logoL from '@assets/logo/left.png';
import logoC from '@assets/logo/center.png';
import logoR from '@assets/logo/right.png';

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={logoL} style={styles.logoImageLeft} />
      <Image source={logoC} style={styles.logoImageCenter} />
      <Image source={logoR} style={styles.logoImageRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
  },
  logoImageLeft: {
    width: 26,
    height: 83,
    marginTop: 20,
    marginRight: 6,
  },
  logoImageCenter: {
    width: 42,
    height: 63,
    marginTop: 10,
    marginRight: -45,
  },
  logoImageRight: {
    width: 73,
    height: 107,
  },
});

export default Logo;
