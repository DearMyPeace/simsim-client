import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ITabBarIconProps } from '@type/ITabBarIconProps';
import CalendarIconSVG from '@assets/images/diary.svg';
import PieceIconSVG from '@assets/images/piece.svg';
import MailOpen from '@assets/svg/icons/ion--mail-open-outline.svg';
import Mail from '@assets/svg/icons/ion--mail-outline.svg';
import Shop from '@assets/svg/icons/tdesign--shop-5.svg';
import MyIconButton from '@components/common/MyIconButton';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@stores/login';
import { alertColor } from '@utils/colors';

export const CalendarIcon = memo(({ color }: ITabBarIconProps) => {
  return <CalendarIconSVG style={{ color: color }} width={24} height={24} />;
});

export const AiLetterIcon = ({ focused, color, size }: ITabBarIconProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const mailIcon =
    userInfo.replyStatus === 'C' ? (
      <MailOpen width={26} height={26} stroke={color} />
    ) : (
      <Mail width={26} height={26} stroke={color} />
    );
  const showBadge = userInfo.replyStatus === 'R';

  return (
    <View>
      {focused ? <MailOpen width={26} height={26} stroke={color} /> : mailIcon}
      {showBadge && <View style={styles.badge} />}
    </View>
  );
};

export const ShopIcon = memo(({ color }: ITabBarIconProps) => (
  <Shop width={24.5} height={24.5} fill={color} />
));

export const PieceIcon = memo(({ color }: ITabBarIconProps) => {
  return <PieceIconSVG style={{ color: color }} width={34} height={34} />;
});

export const CloseIcon = memo(({ onPress }: { onPress: () => {} }) => (
  <MyIconButton name="close" size={28} style={{ paddingHorizontal: 16 }} onPress={onPress} />
));

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -1,
    top: 1,
    backgroundColor: alertColor,
    borderRadius: 8,
    width: 7,
    height: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
