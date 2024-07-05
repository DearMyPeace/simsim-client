import React, { memo, useEffect } from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { ITabBarIconProps } from '@type/ITabBarIconProps';
import CalendarIconSVG from '@assets/images/diary.svg';
import PieceIconSVG from '@assets/images/piece.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyIconButtons from '@components/common/MyIconButtons';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@stores/login';

export const CalendarIcon = memo(({ color }: ITabBarIconProps) => {
  if (Platform.OS === 'web') {
    return <Image source={CalendarIconSVG} tintColor={color} style={{ width: 24, height: 24 }} />;
  }
  return <CalendarIconSVG style={{ color: color }} width={24} height={24} />;
});

export const AiLetterIcon = ({ focused, color, size }: ITabBarIconProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const iconName = userInfo.replyStatus === 'C' ? 'mail-open-outline' : 'mail-outline';
  const showBadge = userInfo.replyStatus === 'R';

  return (
    <View>
      <Ionicons name={focused ? 'mail-open-outline' : iconName} color={color} size={26} />
      {showBadge && <View style={styles.badge} />}
    </View>
  );
};

export const ShopIcon = memo(({ color }: ITabBarIconProps) => (
  <AntDesign name="isv" color={color} size={24.5} />
));

export const PieceIcon = memo(({ color }: ITabBarIconProps) => {
  if (Platform.OS === 'web') {
    return <Image source={PieceIconSVG} tintColor={color} style={{ width: 34, height: 34 }} />;
  }
  return <PieceIconSVG style={{ color: color }} width={34} height={34} />;
});

export const CloseIcon = ({ onPress }: { onPress: () => {} }) => (
  <MyIconButtons
    name={'close'}
    iconSet={'MaterialCommunityIcons'}
    size={24}
    onPress={onPress}
    style={{ paddingHorizontal: 16 }}
  />
);

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -1,
    top: 1,
    backgroundColor: '#EB6D52',
    borderRadius: 8,
    width: 7,
    height: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
