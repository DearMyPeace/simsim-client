import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import MyText from 'components/common/MyText';
import { fontLarge } from '@utils/Sizing';

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
}

const MyRadioButton = ({ label, value, selected, onPress }: RadioButtonProps) => {
  return (
    <Pressable
      style={(state) => [
        styles.radioButtonContainer,
        state.pressed && { opacity: 0.5 },
        state.hovered && { backgroundColor: 'rgba(31, 27, 21, 0.06)' },
      ]}
      onPress={() => onPress(value)}
    >
      <View style={[styles.radioCircle, selected && styles.selectedRadioCircle]}>
        {selected && <View style={styles.radioInnerCircle} />}
      </View>
      <MyText style={styles.radioLabel}>{label}</MyText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4e4539',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioCircle: {
    borderColor: '#7e5700',
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#7e5700',
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: fontLarge,
  },
});

export default MyRadioButton;
