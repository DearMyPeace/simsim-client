import React from 'react';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import { StyleSheet, View } from 'react-native';
import { fontLarge } from '@utils/Sizing';

interface ISectionProps {
  label: string;
  buttonText: string;
  onPress: () => void;
}

const SettingSection = ({ label, buttonText, onPress }: ISectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MyText bold size={fontLarge}>
          {label}
        </MyText>
        <TextButton onPress={onPress}>{buttonText}</TextButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 11,
  },
  content: {
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5D5',
  },
});

export default SettingSection;
