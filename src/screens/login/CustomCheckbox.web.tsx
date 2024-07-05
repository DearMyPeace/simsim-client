import React from 'react';
import { CheckBox as WebCheckBox } from 'react-native-web';
import { StyleSheet } from 'react-native';

interface Props {
  isChecked: boolean;
  handleCheckboxPress: () => void;
}

const CustomCheckbox: React.FC<Props> = ({ isChecked, handleCheckboxPress }) => {
  return (
    <WebCheckBox
      value={isChecked}
      color="#444"
      onChange={handleCheckboxPress}
      style={styles.checkbox}
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
