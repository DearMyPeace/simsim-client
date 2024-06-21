import React from 'react';
import { StyleSheet, TextInput, TextInputProps, Platform, View, ViewStyle } from 'react-native';
import MyText from '@components/common/MyText';

const MyTextInput = ({ textAlign = 'left', style, ...props }: TextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput style={[{ textAlign }, styles.input, style]} {...props} />
      {props.multiline && props.maxLength && (
        <View style={{ flexDirection: 'row-reverse' }}>
          <MyText size={13} style={[{ color: '#C53333' }]}>
            {props.value?.length}/{props.maxLength}
          </MyText>
        </View>
      )}
    </View>
  );
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
