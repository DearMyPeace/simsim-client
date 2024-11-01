import React, { memo } from 'react';
import Apple from '@assets/svg/icons/fa6-brands--apple.svg';
import { StyleProp, ViewStyle } from 'react-native';

interface IAppleIconProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const AppleIcon = memo(({ size = 24, color = '#000', style }: IAppleIconProps) => (
  <Apple width={size} height={size} fill={color} style={style} />
));

export default AppleIcon;
