import React from 'react';
import { StyleSheet, TextInput, TextInputProps, Platform, View, ViewStyle } from 'react-native';

const MyTextInput = ({ textAlign = 'left', style, ...props }: TextInputProps) => {
  return <TextInput style={[{ textAlign }, styles.input, style]} {...props} />;
};

export default MyTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  input: {
    fontFamily: 'GowunBatang-Regular',
    fontSize: 14,
    color: 'black',
    borderWidth: 0,
    ...Platform.select({
      web: {
        height: '100%',
      },
    }),
  },
});
