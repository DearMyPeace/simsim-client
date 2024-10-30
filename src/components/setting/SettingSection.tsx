import React from 'react';
import MyText from '@components/common/MyText';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontLarge } from '@utils/Sizing';

interface ISectionProps {
  label: string;
  content?: string;
  onPress?: () => void;
  textColor?: string;
  icon?: React.ReactNode;
}

const SettingSection = ({
  label,
  content = '',
  onPress,
  textColor = 'black',
  icon,
}: ISectionProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={(state) => [
          styles.button,
          state.pressed && { opacity: 0.5 },
          state.hovered && { backgroundColor: 'rgba(31, 27, 21, 0.06)' },
          !onPress && { cursor: 'default' },
        ]}
        onPress={onPress}
      >
        <MyText bold size={fontLarge}>
          {label}
        </MyText>
        <View style={styles.contentContainer}>
          {icon}
          <MyText style={{ color: textColor }}>{content}</MyText>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5D5',
  },
  button: {
    padding: 5,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.5,
  },
  contentContainer: {
    flexDirection: 'row',
    marginVertical: 9,
  },
});

export default SettingSection;
