import React, { forwardRef, Ref } from 'react';
import { StyleSheet, TextInput, TextInputProps, Platform } from 'react-native';
interface MyTextInputProps extends TextInputProps {
  textAlign?: 'left' | 'center' | 'right';
}

const MyTextInput = forwardRef(({ textAlign = 'left', style, ...rest }: MyTextInputProps) => {
  return (
    <TextInput
      style={[{ textAlign }, styles.input, style]}
      placeholderTextColor="#666666"
      {...rest}
    />
  );
});

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
