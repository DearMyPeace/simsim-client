import React from 'react';
import MyText from '@components/common/MyText';
import TextButton from '@components/common/TextButton';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontLarge } from '@utils/Sizing';

interface ISectionProps {
  label: string;
  content?: string;
  onPress?: () => void;
  onLabelPress?: () => void;
  textColor?: string;
  icon?: React.ReactNode;
}

const SettingSection = ({
  label,
  content = '',
  onPress,
  onLabelPress,
  textColor = 'black',
  icon,
}: ISectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {onLabelPress ? (
          <Pressable onPress={onLabelPress}>
            {({ pressed }) => (
              <MyText bold size={fontLarge} style={[pressed && styles.pressed]}>
                {label}
              </MyText>
            )}
          </Pressable>
        ) : (
          <MyText bold size={fontLarge}>
            {label}
          </MyText>
        )}
        {onPress ? (
          <TextButton textColor={textColor} onPress={onPress}>
            {content}
          </TextButton>
        ) : (
          <View style={styles.contentContainer}>
            {icon}
            <MyText style={{ color: textColor }}>{content}</MyText>
          </View>
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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 9,
  },
});

export default SettingSection;
