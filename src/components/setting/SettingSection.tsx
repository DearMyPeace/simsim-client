import React from 'react';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import { StyleSheet, View } from 'react-native';
import { fontLarge } from '@utils/Sizing';

interface ISectionProps {
  label: string;
  content: string;
  onPress?: () => void;
}

const SettingSection = ({ label, content, onPress }: ISectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MyText bold size={fontLarge}>
          {label}
        </MyText>
        {onPress ? (
          <TextButton onPress={onPress}>{content}</TextButton>
        ) : (
          <MyText>{content}</MyText>
        )}
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
  pressed: {
    opacity: 0.5,
  },
});

export default SettingSection;
