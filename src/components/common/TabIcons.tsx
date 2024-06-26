import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MyIconButtons from '@components/common/MyIconButtons.tsx';

export const AiLetterIcon = ({ color }: ITabBarIconProps) => (
  <MaterialCommunityIcons name="email-outline" color={color} size={26} />
);

export const CalendarIcon = ({ color }: ITabBarIconProps) => (
  <MaterialCommunityIcons name="calendar-edit" color={color} size={26} />
);

export const ShopIcon = ({ color }: ITabBarIconProps) => (
  <Entypo name="shop" color={color} size={24.5} />
);

export const PieceIcon = ({ color }: ITabBarIconProps) => (
  <FontAwesome6 name="puzzle-piece" color={color} size={26} />
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
