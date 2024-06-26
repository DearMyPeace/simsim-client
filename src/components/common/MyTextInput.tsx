import React from 'react';
import { StyleSheet, TextInput, TextInputProps, Platform } from 'react-native';
import { fontBasic } from '@utils/Sizing';

interface MyTextInputProps extends TextInputProps {
  textAlign?: 'left' | 'center' | 'right';
}

const MyTextInput = ({ textAlign = 'left', style, ...rest }: MyTextInputProps) => {
  return (
    <TextInput
      style={[{ textAlign }, styles.input, style]}
      placeholderTextColor="#666666"
      {...rest}
    />
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'GowunBatang-Regular',
    fontSize: fontBasic,
    color: 'black',
    borderWidth: 0,
    ...Platform.select({
      web: {
        height: '100%',
        outlineStyle: 'none',
      },
    }),
  },
});
