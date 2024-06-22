import React from 'react';
import { StyleSheet, TextInput, TextInputProps, Platform } from 'react-native';

const MyTextInput = ({ textAlign = 'left', style, ...props }: TextInputProps) => {
  return <TextInput style={[{ textAlign }, styles.input, style]} {...props} />;
};

export default MyTextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'GowunBatang-Regular',
    fontSize: 14,
    color: 'black',
    borderWidth: 0,
    outlineStyle: 'none',
    ...Platform.select({
      web: {
        height: '100%',
      },
    }),
  },
});
