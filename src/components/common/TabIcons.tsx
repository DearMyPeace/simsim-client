import React from 'react';
import { Platform, Image } from 'react-native';
import { ITabBarIconProps } from '@type/ITabBarIconProps';
import CalendarIconSVG from '@assets/images/diary.svg';
import PieceIconSVG from '@assets/images/tab_piece_2.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyIconButtons from '@components/common/MyIconButtons';

export const CalendarIcon = ({ color }: ITabBarIconProps) => {
  if (Platform.OS === 'web') {
    return <Image source={CalendarIconSVG} tintColor={color} style={{ width: 24, height: 24 }} />;
  }
  return <CalendarIconSVG stroke={color} width={24} height={24} />;
};

export const AiLetterIcon = ({ color }: ITabBarIconProps) => {
  const currentHour = new Date().getHours();
  const iconName = currentHour < 12 ? 'mail-outline' : 'mail-open-outline';
  return <Ionicons name={iconName} color={color} size={26} />;
};

export const ShopIcon = ({ color }: ITabBarIconProps) => (
  <AntDesign name="isv" color={color} size={24.5} />
);

export const PieceIcon = ({ color }: ITabBarIconProps) => {
  if (Platform.OS === 'web') {
    return <Image source={PieceIconSVG} tintColor={color} style={{ width: 34, height: 34 }} />;
  }
  <PieceIconSVG stroke={color} width={34} height={34} />;
};

export const CloseIcon = ({ onPress }: { onPress: () => {} }) => (
  <MyIconButtons
    name={'close'}
    iconSet={'MaterialCommunityIcons'}
    size={24}
    onPress={onPress}
    style={{ paddingHorizontal: 16 }}
  />
);
