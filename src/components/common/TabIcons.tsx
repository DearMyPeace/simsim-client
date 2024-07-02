import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MyIconButtons from '@components/common/MyIconButtons.tsx';
import PieceIconPNG from '@assets/images/tab_piece_2.svg';
import CalendarIconSVG from '@assets/images/dialy.svg';
import { View, Text, Image } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export const CalendarIcon = ({ color }: ITabBarIconProps) => (
  <Image source={CalendarIconSVG} tintColor={color} style={{ width: 24, height: 24 }} />
  // <MaterialCommunityIcons name="calendar-edit" color={color} size={26} />
  // <Ionicons name="calendar-outline" color={color} size={24.5} />
  // <FontAwesome name="sticky-note-o" color={color} size={24.5} />
  // <FontAwesome name="calendar-o" color={color} size={24.5} />
  // <Entypo name="pencil" color={color} size={24.5} />
  // <FontAwesome name="spinner" color={color} size={26} />
);

export const AiLetterIcon = ({ color }: ITabBarIconProps) => {
  const currentHour = new Date().getHours();
  const iconName = currentHour < 12 ? 'mail-outline' : 'mail-open-outline';
  return <Ionicons name={iconName} color={color} size={26} />;
};

export const ShopIcon = ({ color }: ITabBarIconProps) => (
  <AntDesign name="isv" color={color} size={24.5} />
);

export const PieceIcon = ({ color }: ITabBarIconProps) => (
  // <FontAwesome6 name="puzzle-piece" color={color} size={26} />
  <Image source={PieceIconPNG} tintColor={color} style={{ width: 34, height: 34 }} />
);

export const CloseIcon = ({ onPress }: { onPress: () => {} }) => (
  <MyIconButtons
    name={'close'}
    iconSet={'MaterialCommunityIcons'}
    size={24}
    onPress={onPress}
    style={{ paddingHorizontal: 16 }}
  />
);
