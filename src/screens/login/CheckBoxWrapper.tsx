import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import CustomCheckbox from '@screens/login/CustomCheckbox';
import { fontBasic } from '@utils/Sizing';
import MyText from '@components/common/MyText';

interface Props {
  isPolicyChecked: boolean;
  isTermsChecked: boolean;
  handleCheckboxPress: () => void;
}

const CheckboxWrapper: React.FC<Props> = ({
  isPolicyChecked,
  isTermsChecked,
  handleCheckboxPress,
}) => {
  return (
    <View style={styles.termsWrapper}>
      <CustomCheckbox
        isChecked={isPolicyChecked && isTermsChecked}
        handleCheckboxPress={handleCheckboxPress}
      />
      <Pressable onPress={handleCheckboxPress} style={styles.termsWrapper}>
        <MyText style={styles.termsText}>이용약관</MyText>
        <MyText style={styles.termsTextNoLine}> 및 </MyText>
        <MyText style={styles.termsText}>개인정보처리방침</MyText>
        <MyText style={styles.termsTextNoLine}> 동의</MyText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  termsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    fontFamily: 'GowunBatang-Regular',
    fontSize: fontBasic,
    color: '#000',
    textDecorationLine: 'underline',
    marginLeft: 3.5,
  },
  termsTextNoLine: {
    fontFamily: 'GowunBatang-Regular',
    fontSize: fontBasic,
    color: '#000',
  },
});

export default CheckboxWrapper;
