import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet } from 'react-native';

interface Props {
  isChecked: boolean;
  handleCheckboxPress: () => void;
}

const CustomCheckbox: React.FC<Props> = ({ isChecked, handleCheckboxPress }) => {
  return (
    <CheckBox
      style={styles.checkbox}
      disabled={true}
      value={isChecked}
      onCheckColor="#FFFFFF"
      onFillColor="black"
      onTintColor="black"
      onChange={handleCheckboxPress}
      boxType="square"
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default CustomCheckbox;
